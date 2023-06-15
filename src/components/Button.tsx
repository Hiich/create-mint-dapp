import Image from "next/image";
import sign from "~/../public/images/sign.png";
import smallSign from "~/../public/images/small-sign.png";
type Props = {
  onClick: () => void;
  title: string;
  signSize: "small" | "large";
};

export const Button = ({ onClick, title, signSize }: Props) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="relative flex items-center justify-center"
    >
      <Image
        src={signSize === "small" ? smallSign : smallSign}
        alt="Sign"
        width={signSize === "small" ? 100 : 200}
        height={signSize === "small" ? 100 : 150}
      />
      <p
        className={
          "absolute  -translate-y-1 transform text-center text-5xl font-bold text-white "
        }
      >
        {title}
      </p>
    </button>
  );
};
