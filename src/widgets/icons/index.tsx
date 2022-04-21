interface Props {
  icon: string;
  onClick?: Function;
}

export default (_props: Props) => {
  return (
    <i
      className={"iconfont " + _props.icon}
      onClick={() => _props.onClick?.()}
    />
  );
};
