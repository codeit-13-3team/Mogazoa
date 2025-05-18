const CompareTable = () => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full bg-black-400 text-gray-100 rounded-lg overflow-hidden text-center font-normal">
        <thead>
          <tr>
            <th className="px-4 py-[15px] font-normal">기준</th>
            <th className="px-4 py-[15px] font-normal">상품 1</th>
            <th className="px-4 py-[15px] font-normal">상품 2</th>
            <th className="px-4 py-[15px] font-normal">결과</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-black-300">
            <td className="px-[17px] py-5 md:py-[30px]">별점</td>
            <td className="px-[17px] py-5 md:py-[30px] text-gray-50">4.8</td>
            <td className="px-[17px] py-5 md:py-[30px] text-gray-50">4.9</td>
            <td className="px-[17px] py-5 md:py-[30px] text-pink font-medium">상품 2 승리</td>
          </tr>

          <tr>
            <td className="px-[17px] py-5 md:py-[30px]">리뷰 개수</td>
            <td className="px-[17px] py-5 md:py-[30px] text-gray-50">100</td>
            <td className="px-[17px] py-5 md:py-[30px] text-gray-50">300</td>
            <td className="px-[17px] py-5 md:py-[30px] text-pink font-medium">상품 2 승리</td>
          </tr>

          <tr>
            <td className="px-[17px] py-5 md:py-[30px]">찜 개수</td>
            <td className="px-[17px] py-5 md:py-[30px] text-gray-50">10,000</td>
            <td className="px-[17px] py-5 md:py-[30px] text-gray-50">100</td>
            <td className="px-[17px] py-5 md:py-[30px] text-green font-medium">상품 1 승리</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CompareTable;
