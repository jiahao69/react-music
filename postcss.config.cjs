module.exports = {
  plugins: {
    "postcss-px-to-viewport-8-plugin": {
      // 需要转换的单位
      unitToConvert: "px",
      // 设计稿宽度
      viewportWidth: 375,
      // 保留几位小数
      unitPrecision: 5,
      // 需要转换的css属性
      propList: ["*"],
      // 目标单位
      viewportUnit: "vw",
      // 字体使用的单位
      fontViewportUnit: "vw",
    },
  },
};
