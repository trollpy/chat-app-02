import { WelcomeSvg } from "../../utils/WelcomeSvg";

export default function Welcome() {
  return (
    <div className="lg:col-span-2 lg:block bg-white dark:bg-gray-900">
      <div className="pl-5">
        <WelcomeSvg />
        <div className="text-center"></div>
      </div>
    </div>
  );
}
