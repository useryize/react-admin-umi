// 绿色上升箭头
const IconUpArrow = () => (
  <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.37574 6.25258C9.80862 6.25258 10.037 5.73986 9.74738 5.4181L6.37008 1.66552C6.17146 1.44483 5.8254 1.44483 5.62678 1.66552L2.24945 5.41809C1.95987 5.73985 2.18821 6.25258 2.6211 6.25258H4.27C4.54614 6.25258 4.77 6.47643 4.77 6.75258V12.7526C4.77 13.0287 4.99385 13.2526 5.27 13.2526H6.77C7.04614 13.2526 7.27 13.0287 7.27 12.7526V6.75258C7.27 6.47643 7.49385 6.25258 7.77 6.25258H9.37574Z"
      fill="#0DC986"
    />
  </svg>
);
// 红色下降箭头
const IconDownArrow = () => (
  <svg width="10" height="12" viewBox="0 0 10 14" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.37574 8.74742C9.80862 8.74742 10.037 9.26014 9.74738 9.5819L6.37008 13.3345C6.17146 13.5552 5.8254 13.5552 5.62678 13.3345L2.24945 9.58191C1.95987 9.26015 2.18821 8.74742 2.6211 8.74742H4.27C4.54614 8.74742 4.77 8.52357 4.77 8.24742V2.24742C4.77 1.97128 4.99385 1.74742 5.27 1.74742H6.77C7.04614 1.74742 7.27 1.97128 7.27 2.24742V8.24742C7.27 8.52357 7.49385 8.74742 7.77 8.74742H9.37574Z"
      fill="#E0252B"
    />
  </svg>
);
export const RedIconUpArrow = () => (
  <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.37574 6.25258C9.80862 6.25258 10.037 5.73986 9.74738 5.4181L6.37008 1.66552C6.17146 1.44483 5.8254 1.44483 5.62678 1.66552L2.24945 5.41809C1.95987 5.73985 2.18821 6.25258 2.6211 6.25258H4.27C4.54614 6.25258 4.77 6.47643 4.77 6.75258V12.7526C4.77 13.0287 4.99385 13.2526 5.27 13.2526H6.77C7.04614 13.2526 7.27 13.0287 7.27 12.7526V6.75258C7.27 6.47643 7.49385 6.25258 7.77 6.25258H9.37574Z"
      fill="#E0252B"
    />
  </svg>
);
// 红色下降箭头
export const BlueIconDownArrow = () => (
  <svg width="10" height="12" viewBox="0 0 10 14" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.37574 8.74742C9.80862 8.74742 10.037 9.26014 9.74738 9.5819L6.37008 13.3345C6.17146 13.5552 5.8254 13.5552 5.62678 13.3345L2.24945 9.58191C1.95987 9.26015 2.18821 8.74742 2.6211 8.74742H4.27C4.54614 8.74742 4.77 8.52357 4.77 8.24742V2.24742C4.77 1.97128 4.99385 1.74742 5.27 1.74742H6.77C7.04614 1.74742 7.27 1.97128 7.27 2.24742V8.24742C7.27 8.52357 7.49385 8.74742 7.77 8.74742H9.37574Z"
      fill="#0DC986"
    />
  </svg>
);

type options = {
  value: number | string;
  afterFix?: string;
  isShowArrow?: boolean;
  reverse?: boolean; //是否反转颜色和箭头，通常用于理赔、客诉、损坏的指标
  style?: any;
};

const RateRender: React.FC<options> = ({ value, afterFix = '', isShowArrow = true, reverse = false, style = {} }) => {
  if (value === '--' || value === '' || value === undefined || value === null) {
    return <span>--</span>;
  }
  let val;
  if (typeof value === 'string') {
    val = parseFloat(value);
  } else {
    val = value;
  }

  const valueFormat = `${Math.abs(val)}${afterFix}`;
  if (val > 0) {
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', ...style }} className="rateRender">
        {valueFormat} {isShowArrow && reverse ? <RedIconUpArrow /> : <IconUpArrow />}
      </span>
    );
  } else if (val < 0) {
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', ...style }} className="rateRender">
        {isShowArrow ? '' : '-'}
        {valueFormat} {isShowArrow && reverse ? <BlueIconDownArrow /> : <IconDownArrow />}
      </span>
    );
  } else {
    return <span>{valueFormat}</span>;
  }
};

export default RateRender;
