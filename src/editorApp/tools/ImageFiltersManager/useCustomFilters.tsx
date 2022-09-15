import { fabric } from "fabric"

const useCustomFilters = () => {
  //--------------------------Custom Filters for Redify-----------------///
  //@ts-ignore
  fabric.Image.filters.Redify = fabric.util.createClass(
    fabric.Image.filters.BaseFilter,
    {
      /**
       * Filter type
       * @param {String} type
       * @default
       */
      type: "Redify",

      /**
       * Fragment source for the threshold program
       */
      fragmentSource:
        "precision highp float;\n" +
        "varying vec2 vTexCoord;\n" +
        "uniform sampler2D uTexture;\n" +
        "void main() {\n" +
        "vec4 color = texture2D(uTexture, vTexCoord);\n" +
        "color.g = 0.0;\n" +
        "color.b = 0.0;\n" +
        "gl_FragColor = color;\n" +
        "}",

      /**
       * Redify value, from -1 to 1.
       * translated to -255 to 255 for 2d
       * 0.0039215686 is the part of 1 that get translated to 1 in 2d
       * @param {Number} threshold
       * @default
       */
      threshold: 5,

      /**
       * Describe the property that is the filter parameter
       * @param {String} m
       * @default
       */
      mainParameter: "threshold",

      /**
       * Apply the Redify operation to a Uint8ClampedArray representing the pixels of an image.
       *
       * @param {Object} options
       * @param {ImageData} options.imageData The Uint8ClampedArray to be filtered.
       */
      applyTo2d: function (options: any) {
        var imageData = options.imageData,
          data = imageData.data,
          i,
          len = data.length,
          sublim = 255 - this.threshold
        for (i = 0; i < len; i += 4) {
          if (
            data[i] < sublim &&
            data[i + 1] < sublim &&
            data[i + 2] < sublim
          ) {
            data[i + 1] = 0
            data[i + 2] = 0
          }
        }
      },

      /**
       * Return WebGL uniform locations for this filter's shader.
       *
       * @param {WebGLRenderingContext} gl The GL canvas context used to compile this filter's shader.
       * @param {WebGLShaderProgram} program This filter's compiled shader program.
       */
      getUniformLocations: function (gl: any, program: any) {
        return {
          uMyParameter: gl.getUniformLocation(program, "uMyParameter"),
        }
      },

      /**
       * Send data from this filter to its shader program's uniforms.
       *
       * @param {WebGLRenderingContext} gl The GL canvas context used to compile this filter's shader.
       * @param {Object} uniformLocations A map of string uniform names to WebGLUniformLocation objects
       */
      sendUniformData: function (gl: any, uniformLocations: any) {
        gl.uniform1f(uniformLocations.uMyParameter, this.threshold)
      },
    }
  )

  //@ts-ignore
  fabric.Image.filters.Redify.fromObject =
    //@ts-ignore
    fabric.Image.filters.BaseFilter.fromObject

  //--------------------------Custom Filters for Greenify-----------------///
  //@ts-ignore
  fabric.Image.filters.Greenify = fabric.util.createClass(
    fabric.Image.filters.BaseFilter,
    {
      /**
       * Filter type
       * @param {String} type
       * @default
       */
      type: "Greenify",

      /**
       * Fragment source for the threshold program
       */
      fragmentSource:
        "precision highp float;\n" +
        "varying vec2 vTexCoord;\n" +
        "uniform sampler2D uTexture;\n" +
        "void main() {\n" +
        "vec4 color = texture2D(uTexture, vTexCoord);\n" +
        "color.r = 0.0;\n" +
        "color.b = 0.0;\n" +
        "gl_FragColor = color;\n" +
        "}",

      /**
       * Redify value, from -1 to 1.
       * translated to -255 to 255 for 2d
       * 0.0039215686 is the part of 1 that get translated to 1 in 2d
       * @param {Number} threshold
       * @default
       */
      threshold: 5,

      /**
       * Describe the property that is the filter parameter
       * @param {String} m
       * @default
       */
      mainParameter: "threshold",

      /**
       * Apply the Redify operation to a Uint8ClampedArray representing the pixels of an image.
       *
       * @param {Object} options
       * @param {ImageData} options.imageData The Uint8ClampedArray to be filtered.
       */
      applyTo2d: function (options: any) {
        var imageData = options.imageData,
          data = imageData.data,
          i,
          len = data.length,
          sublim = 255 - this.threshold
        for (i = 0; i < len; i += 4) {
          if (
            data[i] < sublim &&
            data[i + 1] < sublim &&
            data[i + 2] < sublim
          ) {
            data[i] = 0
            data[i + 2] = 0
          }
        }
      },

      /**
       * Return WebGL uniform locations for this filter's shader.
       *
       * @param {WebGLRenderingContext} gl The GL canvas context used to compile this filter's shader.
       * @param {WebGLShaderProgram} program This filter's compiled shader program.
       */
      getUniformLocations: function (gl: any, program: any) {
        return {
          uMyParameter: gl.getUniformLocation(program, "uMyParameter"),
        }
      },

      /**
       * Send data from this filter to its shader program's uniforms.
       *
       * @param {WebGLRenderingContext} gl The GL canvas context used to compile this filter's shader.
       * @param {Object} uniformLocations A map of string uniform names to WebGLUniformLocation objects
       */
      sendUniformData: function (gl: any, uniformLocations: any) {
        gl.uniform1f(uniformLocations.uMyParameter, this.threshold)
      },
    }
  )

  //@ts-ignore
  fabric.Image.filters.Greenify.fromObject =
    //@ts-ignore
    fabric.Image.filters.BaseFilter.fromObject

  //--------------------------Custom Filters for Blueify-----------------///
  //@ts-ignore
  fabric.Image.filters.Blueify = fabric.util.createClass(
    fabric.Image.filters.BaseFilter,
    {
      /**
       * Filter type
       * @param {String} type
       * @default
       */
      type: "Blueify",

      /**
       * Fragment source for the threshold program
       */
      fragmentSource:
        "precision highp float;\n" +
        "varying vec2 vTexCoord;\n" +
        "uniform sampler2D uTexture;\n" +
        "void main() {\n" +
        "vec4 color = texture2D(uTexture, vTexCoord);\n" +
        "color.r = 0.0;\n" +
        "color.g = 0.0;\n" +
        "gl_FragColor = color;\n" +
        "}",

      /**
       * Redify value, from -1 to 1.
       * translated to -255 to 255 for 2d
       * 0.0039215686 is the part of 1 that get translated to 1 in 2d
       * @param {Number} threshold
       * @default
       */
      threshold: 5,

      /**
       * Describe the property that is the filter parameter
       * @param {String} m
       * @default
       */
      mainParameter: "threshold",

      /**
       * Apply the Blueify operation to a Uint8ClampedArray representing the pixels of an image.
       *
       * @param {Object} options
       * @param {ImageData} options.imageData The Uint8ClampedArray to be filtered.
       */
      applyTo2d: function (options: any) {
        var imageData = options.imageData,
          data = imageData.data,
          i,
          len = data.length,
          sublim = 255 - this.threshold
        for (i = 0; i < len; i += 4) {
          if (
            data[i] < sublim &&
            data[i + 1] < sublim &&
            data[i + 2] < sublim
          ) {
            data[i] = 0
            data[i + 1] = 0
          }
        }
      },

      /**
       * Return WebGL uniform locations for this filter's shader.
       *
       * @param {WebGLRenderingContext} gl The GL canvas context used to compile this filter's shader.
       * @param {WebGLShaderProgram} program This filter's compiled shader program.
       */
      getUniformLocations: function (gl: any, program: any) {
        return {
          uMyParameter: gl.getUniformLocation(program, "uMyParameter"),
        }
      },

      /**
       * Send data from this filter to its shader program's uniforms.
       *
       * @param {WebGLRenderingContext} gl The GL canvas context used to compile this filter's shader.
       * @param {Object} uniformLocations A map of string uniform names to WebGLUniformLocation objects
       */
      sendUniformData: function (gl: any, uniformLocations: any) {
        gl.uniform1f(uniformLocations.uMyParameter, this.threshold)
      },
    }
  )

  //@ts-ignore
  fabric.Image.filters.Blueify.fromObject =
    //@ts-ignore
    fabric.Image.filters.BaseFilter.fromObject

  //---------------------Custom Filters for Vignette-----------------//
  //@ts-ignore
  fabric.Image.filters.Vignette = fabric.util.createClass(
    fabric.Image.filters.BaseFilter,
    {
      type: "Vignette",
      radius: 0.1,
      smoothness: 0.5,
      mainParameter: "radius",
      /**
       * Fragment source for the redify program
       */
      fragmentSource:
        "precision highp float;\n" +
        "uniform sampler2D uTexture;\n" +
        "uniform float uRadius;" +
        "uniform float uSmoothness;" +
        "varying vec2 vTexCoord;\n" +
        "float vignette(vec2 uv, float radius, float smoothness) {" +
        "float diff = radius - distance(uv, vec2(0.5, 0.5));" +
        "return smoothstep(-smoothness, smoothness, diff);" +
        "}" +
        "void main() {\n" +
        "vec2 p = -1.0 + 2.0 * vTexCoord;" +
        "float r = 1.0 - uRadius;" +
        "float vignetteValue = vignette(vTexCoord, r, uSmoothness);" +
        "vec4 color = vec4(texture2D(uTexture, vTexCoord).rgb * vignetteValue,1.0);" +
        //'vec4 color = vec4(texture2D(uTexture,vTexCoord).rgb*r,1.0);\n' +

        //'color.g = 1.0;\n' +
        //'color.b = 0.0;\n' +
        "gl_FragColor = color;\n" +
        "}",

      applyTo2d: function (options: any) {
        var imageData = options.imageData,
          data = imageData.data,
          i,
          len = data.length

        for (i = 0; i < len; i += 4) {
          data[i + 1] = 0
          data[i + 2] = 0
        }
      },
      getUniformLocations: function (gl: any, program: any) {
        return {
          uRadius: gl.getUniformLocation(program, "uRadius"),
          uSmoothness: gl.getUniformLocation(program, "uSmoothness"),
        }
      },
      sendUniformData: function (gl: any, uniformLocations: any) {
        gl.uniform1f(uniformLocations.uRadius, this.radius)
        gl.uniform1f(uniformLocations.uSmoothness, this.smoothness)
      },
    }
  )
  //@ts-ignore
  fabric.Image.filters.Vignette.fromObject =
    //@ts-ignore
    fabric.Image.filters.BaseFilter.fromObject
}

export default useCustomFilters
