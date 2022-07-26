interface Props {
  icon: string;
  onClick?: Function;
  className?: CSSModuleClasses | undefined;
  style?: React.CSSProperties;
  size?: string | number;
}

export default (_props: Props) => {
  return (
    <i
      className={
        "iconfont " +
        (_props.className ? _props.icon + " " + _props.className : _props.icon)
      }
      onClick={() => _props.onClick?.()}
      style={Object.assign(_props.style || {}, {
        fontSize: _props.size?.toString().includes("px")
          ? _props?.size
          : _props?.size + "px",
      })}
    />
  );
};
