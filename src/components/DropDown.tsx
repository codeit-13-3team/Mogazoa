import { ReactNode } from "react";

interface DropDownProps {
   onclick: () => void;
}

function DropDown() {
  return (
    <div className="w-[400px] h-[70px] flex">
      <div>카테고리 선택</div>
      <div className="flex"></div>
    </div>
  );
}

export default DropDown;
