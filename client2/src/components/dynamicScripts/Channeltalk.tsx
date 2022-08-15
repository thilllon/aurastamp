import Script from 'next/script';

export const ChanneltalkScript = () => {
  return (
    <Script id='channeltalk'>
      {`(function(){var w=window;if(w.ChannelIO){return (window.console.error || window.console.log || function(){})('ChannelIO script included twice.');}var ch=function(){ch.c(arguments);};ch.q=[];ch.c=function(args){ch.q.push(args);};w.ChannelIO=ch;function l(){if(w.ChannelIOInitialized){return;}w.ChannelIOInitialized=true;var s=document.createElement('script');s.type='text/javascript';s.async=true;s.src='https://cdn.channel.io/plugin/ch-plugin-web.js';s.charset='UTF-8';var x=document.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);}if(document.readyState==='complete'){l();} else if(window.attachEvent){window.attachEvent('onload',l);} else {window.addEventListener('DOMContentLoaded',l,false);window.addEventListener('load',l,false);}})();ChannelIO('boot',{"pluginKey":"${process.env.NEXT_PUBLIC_CHANNELTALK_PLUGIN_KEY}"});`}
    </Script>
  );
};

// TODO: hide channeltalk button at specific pages
// var blackList = [
//   //challenges/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/
// ];
// for(var blackUrl in blackList){if(blackUrl.test(window.location.pathname)){
//   console.log('##',blackUrl,window.location.pathname);
//   return;}
// }
