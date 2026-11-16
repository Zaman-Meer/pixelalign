import { fabric } from "fabric"

/**
 * Internal replacement for the `fabric-history` package.
 *
 * `fabric-history` depends on an old `fabric@3` release, which pulls in a
 * large vulnerable dependency tree (`request`, `jsdom`, `canvas`, `tar`,
 * `form-data`, ...). The implementation below is a TypeScript port of the
 * original prototype patch and works with the Fabric 5 build used by this app.
 */
type HistoryCanvas = fabric.Canvas & {
  historyUndo: string[]
  historyRedo: string[]
  extraProps: string[]
  historyNextState: string
  historyProcessing: boolean
  _historyNext: () => string
  _historyEvents: () => Record<string, () => void>
  _historyInit: () => void
  _historyDispose: () => void
  _historySaveAction: () => void
  _loadHistory: (
    history: string,
    event: string,
    callback?: () => void
  ) => void
  undo: (callback?: () => void) => void
  redo: (callback?: () => void) => void
  clearHistory: () => void
  offHistory: () => void
  onHistory: () => void
}

const canvasProto = fabric.Canvas.prototype as HistoryCanvas & {
  __historyPatched?: boolean
}

if (!canvasProto.__historyPatched) {
  /**
   * Override the initialize function to call _historyInit().
   */
  const originalInitialize = canvasProto.initialize
  canvasProto.initialize = function (this: HistoryCanvas, ...args: any[]) {
    originalInitialize.apply(this, args as any)
    this._historyInit()
    return this
  } as any

  /**
   * Override the dispose function to call _historyDispose().
   */
  const originalDispose = canvasProto.dispose
  canvasProto.dispose = function (this: HistoryCanvas, ...args: any[]) {
    originalDispose.apply(this, args as any)
    this._historyDispose()
    return this
  } as any

  /**
   * Returns the current state of the canvas as a string.
   */
  canvasProto._historyNext = function (this: HistoryCanvas) {
    return JSON.stringify(this.toDatalessJSON(this.extraProps))
  }

  /**
   * Returns an object with the fabric.js event mappings used to record history.
   */
  canvasProto._historyEvents = function (this: HistoryCanvas) {
    return {
      "object:added": this._historySaveAction,
      "object:removed": this._historySaveAction,
      "object:modified": this._historySaveAction,
      "object:skewing": this._historySaveAction,
    }
  }

  /**
   * Initialization of the history stacks and listeners.
   */
  canvasProto._historyInit = function (this: HistoryCanvas) {
    this.historyUndo = []
    this.historyRedo = []
    this.extraProps = ["selectable"]
    this.historyNextState = this._historyNext()

    const events = this._historyEvents()
    Object.keys(events).forEach((eventName) => {
      this.on(eventName, events[eventName] as any)
    })
  }

  /**
   * Remove the custom event listeners.
   */
  canvasProto._historyDispose = function (this: HistoryCanvas) {
    const events = this._historyEvents()
    Object.keys(events).forEach((eventName) => {
      this.off(eventName, events[eventName] as any)
    })
  }

  /**
   * Push the state of the canvas into the history stack.
   */
  canvasProto._historySaveAction = function (this: HistoryCanvas) {
    if (this.historyProcessing) {
      return
    }

    const json = this.historyNextState
    this.historyUndo.push(json)
    this.historyNextState = this._historyNext()
    this.fire("history:append", { json })
  }

  /**
   * Undo to the latest history state. Pops the latest state from the undo
   * stack, pushes the current state to the redo stack and re-renders.
   */
  canvasProto.undo = function (
    this: HistoryCanvas,
    callback?: () => void
  ) {
    // The undo process re-renders the canvas, which fires object:added and
    // object:modified again. The flag prevents those events being recorded.
    this.historyProcessing = true

    const history = this.historyUndo.pop()
    if (history) {
      this.historyRedo.push(this._historyNext())
      this.historyNextState = history
      this._loadHistory(history, "history:undo", callback)
    } else {
      this.historyProcessing = false
    }
  }

  /**
   * Redo the latest undone history state.
   */
  canvasProto.redo = function (
    this: HistoryCanvas,
    callback?: () => void
  ) {
    this.historyProcessing = true

    const history = this.historyRedo.pop()
    if (history) {
      // Every redo action is a new action for the undo history.
      this.historyUndo.push(this._historyNext())
      this.historyNextState = history
      this._loadHistory(history, "history:redo", callback)
    } else {
      this.historyProcessing = false
    }
  }

  canvasProto._loadHistory = function (
    this: HistoryCanvas,
    history: string,
    event: string,
    callback?: () => void
  ) {
    this.loadFromJSON(history, () => {
      this.renderAll()
      this.fire(event)
      this.historyProcessing = false

      if (callback && typeof callback === "function") {
        callback()
      }
    })
  }

  /**
   * Clear the undo and redo history stacks.
   */
  canvasProto.clearHistory = function (this: HistoryCanvas) {
    this.historyUndo = []
    this.historyRedo = []
    this.fire("history:clear")
  }

  /**
   * Stop recording history actions.
   */
  canvasProto.offHistory = function (this: HistoryCanvas) {
    this.historyProcessing = true
  }

  /**
   * Resume recording history actions.
   */
  canvasProto.onHistory = function (this: HistoryCanvas) {
    this.historyProcessing = false
    this._historySaveAction()
  }

  canvasProto.__historyPatched = true
}

export {}
