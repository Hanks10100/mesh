function unit (number) {
  if (Number(number) !== 0 && typeof WXEnvironment === 'object' && WXEnvironment.platform === 'Web') {
    return number + 'px'
  }
  return number
}

// 根据属性值计算布局样式
export function getGridStyle (props, origins) {
  const { column, width, layout, gap = 0, border } = props;
  const ratio = (width + gap) / column;

  // 计算 Grid 的高度
  const height = origins.pop().y * ratio - gap;

  // 计算外框样式
  const wrapperStyle = {
    position: 'relative',
    width  : unit(width),
    height : unit(height)
  };

  // 计算布局样式
  const layoutStyle = layout.map((size, index) => {
    const coord = origins[index];

    const boxStyle = {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      top   : unit(coord.y * ratio),
      left  : unit(coord.x * ratio),
      width : unit(size[0] * ratio - gap),
      height: unit(size[1] * ratio - gap)
    }

    // 给网格添加边框
    if (border) {
      const { width, style = 'solid', color = '#000', radius } = border;
      const borderStyle = `${unit(width)} ${style} ${color}`;
      if (width && coord.x > 0) boxStyle.borderLeft = borderStyle;
      if (width && coord.y > 0) boxStyle.borderTop  = borderStyle;
      if (radius) boxStyle.borderRadius = radius;
    }

    return boxStyle;
  });

  return { wrapperStyle, layoutStyle };
}
