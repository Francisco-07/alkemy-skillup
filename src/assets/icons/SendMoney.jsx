const SendMoney = ({ fill = "#7a7a7a", ...props }) => {
  return (
    <svg
      width={24}
      height={24}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#prefix__clip0_103_1264)">
        <path d="M.97 9.406a1.512 1.512 0 00-.348 2.63l4.899 3.565L22.92 1.912 7.535 17.07l6.697 4.873c.425.31.975.402 1.481.25a1.685 1.685 0 001.09-1.033l7.164-19.608a.541.541 0 00-.702-.69L.971 9.406zM4.357 16.786l.041.227.951 5.199a1.175 1.175 0 001.79.776c1.325-.854 3.055-1.987 3.008-2.054l-5.79-4.148z" />
      </g>
      <defs>
        <clipPath id="prefix__clip0_103_1264">
          <path fill="#fff" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default SendMoney;
