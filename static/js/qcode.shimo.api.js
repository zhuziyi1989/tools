window.Qrcode = {}
var url = window.location.href
	base_url='https://shimo.im/qrcode?size=396&margin=0&url='
	a=document
	b=''
	h=a.documentElement.clientHeight
	
	b = a.createElement('div'), b.id = 'qrcode-cover', b.setAttribute('style', 'box-sizing: initial;width: 100%;height: '+h+'px;background: #000;opacity: 0.2;position:fixed;top:0;left:0;z-index:99999'), a.body.appendChild(b)
	c = a.createElement('div'), c.id = 'qrcode-box', c.setAttribute('style', 'box-sizing: initial;font-size:12px;width: 200px;height: 290px;border-radius: 4px;-webkit-box-shadow: 0 15px 30px rgba(0,0,0,0.1);box-shadow: 0 15px 30px rgba(0,0,0,0.1);background: #fff;position: fixed;top:20px;left:50%;margin-left:-100px;z-index: 100000;'), a.body.appendChild(c)
	qrcode_box=a.getElementById('qrcode-box')
	qrcode_cover=a.getElementById('qrcode-cover')
	js=a.getElementById('qrcode')
	qrcode_box.innerHTML='<img src="'+base_url+url+'" style="width:200px;height:200px;background:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2%0D%0AZyB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxucz0iaHR0cDovL3d3%0D%0Ady53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hs%0D%0AaW5rIiB2ZXJzaW9uPSIxLjAiIHdpZHRoPSI2NHB4IiBoZWlnaHQ9IjY0cHgiIHZpZXdCb3g9IjAg%0D%0AMCAxMjggMTI4IiB4bWw6c3BhY2U9InByZXNlcnZlIj48Zz48cGF0aCBkPSJNNjQgMEw0MC4wOCAy%0D%0AMS45YTEwLjk4IDEwLjk4IDAgMCAwLTUuMDUgOC43NUMzNC4zNyA0NC44NSA2NCA2MC42MyA2NCA2%0D%0AMC42M1YweiIgZmlsbD0iI2ZmYjExOCIvPjxwYXRoIGQ9Ik0xMjggNjRsLTIxLjg4LTIzLjlhMTAu%0D%0AOTcgMTAuOTcgMCAwIDAtOC43NS01LjA1QzgzLjE3IDM0LjQgNjcuNCA2NCA2Ny40IDY0SDEyOHoi%0D%0AIGZpbGw9IiM4MGMxNDEiLz48cGF0aCBkPSJNNjMuNyA2OS43M2ExMTAuOTcgMTEwLjk3IDAgMCAx%0D%0ALTUuMDQtMjAuNTRjLTEuMTYtOC43LjY4LTE0LjE3LjY4LTE0LjE3aDM4LjAzcy00LjMtLjg2LTE0%0D%0ALjQ3IDEwLjFjLTMuMDYgMy4zLTE5LjIgMjQuNTgtMTkuMiAyNC41OHoiIGZpbGw9IiNjYWRjMjgi%0D%0ALz48cGF0aCBkPSJNNjQgMTI4bDIzLjktMjEuODhhMTAuOTcgMTAuOTcgMCAwIDAgNS4wNS04Ljc1%0D%0AQzkzLjYgODMuMTcgNjQgNjcuNCA2NCA2Ny40VjEyOHoiIGZpbGw9IiNjZjE3MWYiLz48cGF0aCBk%0D%0APSJNNTguMjcgNjMuN2ExMTAuOTcgMTEwLjk3IDAgMCAxIDIwLjU0LTUuMDRjOC43LTEuMTYgMTQu%0D%0AMTcuNjggMTQuMTcuNjh2MzguMDNzLjg2LTQuMy0xMC4xLTE0LjQ3Yy0zLjMtMy4wNi0yNC41OC0x%0D%0AOS4yLTI0LjU4LTE5LjJ6IiBmaWxsPSIjZWMxYjIxIi8+PHBhdGggZD0iTTAgNjRsMjEuODggMjMu%0D%0AOWExMC45NyAxMC45NyAwIDAgMCA4Ljc1IDUuMDVDNDQuODMgOTMuNiA2MC42IDY0IDYwLjYgNjRI%0D%0AMHoiIGZpbGw9IiMwMThlZDUiLz48cGF0aCBkPSJNNjQuMyA1OC4yN2ExMTAuOTcgMTEwLjk3IDAg%0D%0AMCAxIDUuMDQgMjAuNTRjMS4xNiA4LjctLjY4IDE0LjE3LS42OCAxNC4xN0gzMC42M3M0LjMuODYg%0D%0AMTQuNDctMTAuMWMzLjA2LTMuMyAxOS4yLTI0LjU4IDE5LjItMjQuNTh6IiBmaWxsPSIjMDBiYmYy%0D%0AIi8+PHBhdGggZD0iTTY5LjczIDY0LjM0YTExMS4wMiAxMTEuMDIgMCAwIDEtMjAuNTUgNS4wNWMt%0D%0AOC43IDEuMTQtMTQuMTUtLjctMTQuMTUtLjdWMzAuNjVzLS44NiA0LjMgMTAuMSAxNC41YzMuMyAz%0D%0ALjA1IDI0LjYgMTkuMiAyNC42IDE5LjJ6IiBmaWxsPSIjZjhmNDAwIi8+PGNpcmNsZSBjeD0iNjQi%0D%0AIGN5PSI2NCIgcj0iMi4wMyIvPjxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5z%0D%0AZm9ybSIgdHlwZT0icm90YXRlIiBmcm9tPSIwIDY0IDY0IiB0bz0iLTM2MCA2NCA2NCIgZHVyPSIy%0D%0ANzAwbXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIj48L2FuaW1hdGVUcmFuc2Zvcm0+PC9nPjwv%0D%0Ac3ZnPg==) no-repeat center center;background-size: 16%;padding: 20px;box-sizing: border-box;"><p style="text-align:center;color:#999;padding-bottom:20px;margin:0;">使用微信扫一扫</p><div id="btn" style="text-align:center;width:160px;height:30px;background:#ddd;line-height:30px;margin:0 auto;border-radius:4px;color:#666;cursor:pointer;" onclick="close()">关闭</div>'
	var btn=document.getElementById('btn');
	btn.onclick=function(){
		a.body.removeChild(qrcode_box)
		a.body.removeChild(qrcode_cover)
		a.body.removeChild(js)
		delete window.Qrcode
	}





