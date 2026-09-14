type BrandMarkProps = {
  size?: number;
  labelled?: boolean;
};

export function BrandMark({ size = 44, labelled = false }: BrandMarkProps) {
  return (
    <img
      className="brand-mark"
      width={size}
      height={size}
      src="./undogmatic-symbol.png"
      alt={labelled ? "Undogmatic Builders Lab symbol" : ""}
      aria-hidden={labelled ? undefined : true}
    />
  );
}
