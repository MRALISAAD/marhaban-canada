import Image from 'next/image';

type Props = {
  /** Visual size of the logo icon */
  size?: 'sm' | 'md' | 'lg';
  /** Whether to show the brand name next to the icon */
  showName?: boolean;
  /** Brand name text (e.g. "Marhaban Canada") */
  name?: string;
  /** Extra class names for the wrapper */
  className?: string;
};

const sizeMap = {
  sm: { px: 28, cls: 'h-7 w-7' },
  md: { px: 36, cls: 'h-9 w-9' },
  lg: { px: 44, cls: 'h-11 w-11' },
};

export function BrandLogo({ size = 'md', showName = true, name = 'Marhaban Canada', className = '' }: Props) {
  const { px, cls } = sizeMap[size];

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Image
        src="/logo.png"
        alt=""
        width={px}
        height={px}
        className={`${cls} flex-shrink-0 object-contain`}
        aria-hidden="true"
      />
      {showName && (
        <span className="font-heading font-semibold leading-none tracking-tight">
          {name}
        </span>
      )}
    </span>
  );
}
