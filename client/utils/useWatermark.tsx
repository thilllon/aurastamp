import { ReactNode, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { XOR } from 'ts-essentials';

type PortalProps = XOR<
  { children: ReactNode; target?: Element },
  { children: ReactNode; selector?: string }
>;

const Portal = ({ children, selector, target }: PortalProps) => {
  const [hasMounted, setHasMounted] = useState(false);
  const ref = useRef<Element>();
  useEffect(() => {
    const portalId = 'portal-root';
    setHasMounted(true); 
    if (document) {
      const dom = document.createElement('div');
      dom.setAttribute('id', portalId);
      dom.style.width = '100%';
      dom.style.height = '100%';

      document.body.insertAdjacentElement('afterbegin', dom);
      ref.current = dom;
    }
  }, []);
  if (ref.current && hasMounted) {
    let targetElement: Element | null;
    if (selector) {
      targetElement = document.querySelector(selector);
    } else if (target) {
      targetElement = target;
    } else {
      targetElement = document.querySelector('#target');
    }
    return targetElement ? ReactDOM.createPortal(children, targetElement) : null;
  }
  return null;
};

export const useWatermark = (selector: string) => {
  // TODO: 보안기능. 지우는 경우 2배 더 많은 워터마크 생성
  // TODO: 보안. 지우는 경우 body 태그 제거
  //

  useEffect(() => {
    const observeBody = () => {
      const mutationCallback = (mutations: MutationRecord[], observer: MutationObserver) => {
        mutations.forEach((mutation) => {
          mutation.removedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const el = node as HTMLElement;
              if (el.matches(selector)) {
                el.setAttribute('engraved', 'true');
                // TODO: engrave background 다시 2개 생성
              }
            }
          });
        });
      };
      const observer = new MutationObserver(mutationCallback);
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        // attributeFilter: ['class'],
        attributeOldValue: true,
        attributes: true,
      });
    };
    observeBody();
  }, [selector]);
};

// --------------------------------
// --------------------------------
// --------------------------------
// --------------------------------
// import React from 'react';
// import ReactDOM from 'react-dom';
// // import './watermark.css';
// // https://github.com/justQing00/react-watermark/blob/master/components/watermark.jsx
// const defaultOpts = {
//   wm_txt: 'text',
//   wm_x: 20, // 水印起始位置x轴坐标
//   wm_y: 20, // 水印起始位置Y轴坐标
//   wm_rows: 200, // 水印行数
//   wm_cols: 200, // 水印列数
//   wm_x_space: 10, // 水印x轴间隔
//   wm_y_space: 90, // 水印y轴间隔
//   wm_color: '#000000', // 水印字体颜色
//   wm_alpha: 0.005, // 水印透明度
//   wm_fontsize: '12px', // 水印字体大小
//   wm_font: '微软雅黑', // 水印字体
//   wm_width: 200, // 水印宽度
//   wm_height: 30, // 水印高度
//   wm_angle: 25, // 水印倾斜度数
// };

// const getNumbers = ({ outerLength, ownLength, ownPos, ownSpace }: {}) => {
//   return parseInt((outerLength - ownLength + ownSpace) / (ownLength + ownSpace));
// };

// // 获得列或者行的间距
// const getSpace = ({ outerLength, ownLength, ownPos, numbers }) => {
//   return parseInt((outerLength - ownPos - ownLength * numbers) / (numbers - 1));
// };

// // 判断是否需要处理行列
// const isNeedHandle = ({ outerLength, ownLength, ownPos, ownSpace, numbers }) => {
//   return (
//     numbers === 0 || parseInt(ownPos + ownLength * numbers + ownSpace * (numbers - 1)) > outerLength
//   );
// };

// // 获得新的Option
// const getNewOption = (params, numberName, spaceName) => {
//   const option = {};
//   if (isNeedHandle(params)) {
//     const temp = getNumbers(params);
//     option[numberName] = temp;
//     params.numbers = temp;
//     option[spaceName] = getSpace(params);
//   }
//   return option;
// };

// const handleColOrRowWhenZero = (options) => {
//   const pageWidth = Math.max(document.body.scrollWidth, document.body.clientWidth);
//   const pageHeight = Math.max(document.body.scrollHeight, document.body.clientHeight);
//   const { wm_cols, wm_x, wm_width, wm_x_space, wm_rows, wm_y, wm_height, wm_y_space } = options;
//   const xParams = {
//     outerLength: pageWidth,
//     ownLength: wm_width,
//     ownPos: wm_x,
//     ownSpace: wm_x_space,
//     numbers: wm_cols,
//   };
//   const yParams = {
//     outerLength: pageHeight,
//     ownLength: wm_height,
//     ownPos: wm_y,
//     ownSpace: wm_y_space,
//     numbers: wm_rows,
//   };
//   const xOption = getNewOption(xParams, 'wm_cols', 'wm_x_space');
//   const yOption = getNewOption(yParams, 'wm_rows', 'wm_y_space');
//   const option = Object.assign({}, xOption, yOption);
//   return Object.assign({}, options, option);
// };

// const handleStyles = (options) => {
//   let x, y;
//   const marks = [];
//   const {
//     wm_y,
//     wm_rows,
//     wm_y_space,
//     wm_height,
//     wm_cols,
//     wm_x,
//     wm_width,
//     wm_x_space,
//     wm_txt,
//     wm_angle,
//     wm_alpha,
//     wm_fontsize,
//     wm_color,
//   } = options;
//   for (let i = 0; i < wm_rows; i++) {
//     y = wm_y + (wm_y_space + wm_height) * i;
//     for (let j = 0; j < wm_cols; j++) {
//       x = wm_x + (wm_width + wm_x_space) * j;
//       const transform = 'rotate(-' + wm_angle + 'deg)'; // 设置水印div倾斜显示
//       const style = {
//         WebkitTransform: transform,
//         MozTransform: transform,
//         MsTransform: transform,
//         OTransform: transform,
//         transform: transform,
//         left: x + 'px',
//         top: y + 'px',
//         opacity: wm_alpha,
//         fontSize: wm_fontsize,
//         color: wm_color,
//         width: wm_width + 'px',
//         minHeight: wm_height + 'px',
//       };
//       marks.push(
//         <SingleMark key={`${i}-${j}`} style={style}>
//           {wm_txt}
//         </SingleMark>
//       );
//     }
//   }
//   return marks;
// };

// const SingleMark = ({ style, children }) => {
//   return (
//     <div className='single-mark' style={style}>
//       {children}
//     </div>
//   );
// };

// const renderMarks = (target, options) => {
//   if (_.isEmpty(options)) {
//     return;
//   }
//   const newOptions = handleColOrRowWhenZero(Object.assign({}, defaultOpts, options));
//   const marks = handleStyles(newOptions);
//   ReactDOM.render(<EasyContainer>{marks}</EasyContainer>, target);
// };

// const EasyContainer = ({ children }) => {
//   return <div className='mark-outer'>{children}</div>;
// };

// class WaterMark extends React.Component {
//   componentDidMount() {
//     this.target = document.createElement('div');
//     document.body.appendChild(this.target);
//     renderMarks(this.target, this.props.options);
//   }

//   componentWillReceiveProps(nextProps) {
//     renderMarks(this.target, nextProps.options);
//   }

//   shouldComponentUpdate(nextProps) {
//     return !_.isEqual(nextProps.options, this.props.options);
//   }

//   componentWillUnmount() {
//     document.body.removeChild(this.target);
//     this.target = null;
//   }

//   render() {
//     return null;
//   }
// }

// export default WaterMark;
// --------------------------------
// --------------------------------
// --------------------------------

// --------------------------------
// import React from 'react'
// import PropTypes from 'prop-types'
// import getWaterMarkCanvas from './WaterMarkCanvas'
// import SecurityDefense from './SecurityDefense'

// const defaultOptions = {
//   chunkWidth: 200,
//   chunkHeight: 60,
//   textAlign: 'left',
//   textBaseline: 'bottom',
//   globalAlpha: 0.17,
//   font: '14px Microsoft Yahei',
//   rotateAngle: -0.26,
//   fillStyle: '#666'
// }

// const waterMarkStyle = 'position: absolute;left: 0;right: 0;top:0;bottom:0;opacity: 0.7;z-index: 9999;pointer-events: none;overflow: hidden;background-color: transparent;background-repeat: repeat;'
// const noop = function () {}

// class WaterMark extends React.Component {
//   static propTypes = {
//     children: PropTypes.element.isRequired,
//     waterMarkText: PropTypes.string.isRequired,
//     openSecurityDefense: PropTypes.bool,
//     securityAlarm: PropTypes.func,
//     options: PropTypes.shape({
//       chunkWidth: PropTypes.number,
//       chunkHeight: PropTypes.number,
//       textAlign: PropTypes.string,
//       textBaseline: PropTypes.string,
//       globalAlpha: PropTypes.number,
//       font: PropTypes.string,
//       rotateAngle: PropTypes.number,
//       fillStyle: PropTypes.string
//     })
//   }

//   constructor(props) {
//     super(props)
//     this.watermarkId = this.genRandomId('water-mark')
//     this.watermarkWrapperId = this.genRandomId('water-mark-wrapper')
//     this.security = null
//     this.DOMRemoveObserver = null
//     this.DOMAttrModifiedObserver = null
//   }

//   encrypt = (str) => {
//     return window.btoa(decodeURI(encodeURIComponent(str)))
//   }

//   genRandomId = (prefix = '') => {
//     return `${this.encrypt(prefix)}-${(new Date()).getTime()}-${Math.floor(Math.random() * Math.pow(10, 8))}`
//   }

//   componentDidMount() {
//     const { openSecurityDefense, securityAlarm } = this.props
//     if (openSecurityDefense) {
//       const style = {
//         waterMarkStyle,
//         getCanvasUrl: this.getCanvasUrl
//       }
//       const securityHooks = {
//         securityAlarm,
//         updateObserver: this.updateObserver
//       }
//       const watermarkDOM = {
//         watermarkId: this.watermarkId,
//         watermarkWrapperId: this.watermarkWrapperId,
//         genRandomId: this.genRandomId
//       }
//       this.security = new SecurityDefense(watermarkDOM, style, securityHooks)
//     }
//   }

//   componentWillUnmount() {
//     if (this.props.openSecurityDefense) {
//       if (this.DOMRemoveObserver) {
//         this.DOMRemoveObserver.disconnect()
//       }
//       if (this.DOMAttrModifiedObserver) {
//         this.DOMAttrModifiedObserver.disconnect()
//       }
//       this.security = null
//     }
//   }

//   updateObserver = (observers = {}) => {
//     if (observers.DOMRemoveObserver) {
//       this.DOMRemoveObserver = observers.DOMRemoveObserver
//     }
//     if (observers.DOMAttrModifiedObserver) {
//       this.DOMAttrModifiedObserver = observers.DOMAttrModifiedObserver
//     }
//   }

//   getCanvasUrl = () => {
//     const { waterMarkText, options } = this.props
//     const newOptions = Object.assign({}, defaultOptions, options)
//     return getWaterMarkCanvas(waterMarkText, newOptions)
//   }

//   render() {
//     const { children } = this.props
//     const styles = {
//       position: 'absolute',
//       left: 0,
//       right: 0,
//       top: 0,
//       bottom: 0,
//       opacity: 0.7,
//       zIndex: 9999,
//       pointerEvents: 'none',
//       overflow: 'hidden',
//       backgroundImage: `url("${this.getCanvasUrl()}")`,
//       backgroundColor: 'transparent',
//       backgroundRepeat: 'repeat'
//     }

//     return (
//       <div style={{ position: 'relative' }} id={this.watermarkWrapperId}>
//         <div style={styles} id={this.watermarkId} />
//         {children}
//       </div>
//     )
//   }
// }

// WaterMark.defaultProps = {
//   openSecurityDefense: false,
//   securityAlarm: noop,
//   options: defaultOptions
// }

// export default WaterMark
