/*
    Ethereal by HTML5 UP
    html5up.net | @ajlkn (html5up.net/license)
*/

	(function($) { // jQuery를 이용한 즉시 실행 함수 시작. $는 jQuery 객체를 나타냅니다.

		// 설정 값들을 담고 있는 객체를 생성.
		let settings = { // 다양한 기능에 대한 설정들을 저장할 객체
	
			// 키보드 단축키 설정.
			keyboardShortcuts: {
	
				// true일 경우, 키보드로 페이지 스크롤이 가능합니다.
				enabled: true,
	
				// 왼쪽/오른쪽 화살표 키를 눌렀을 때 이동할 거리(픽셀 단위)를 설정합니다.
				distance: 50
			},
	
			// 마우스 휠을 사용한 스크롤 설정.
			scrollWheel: {
	
				// true일 경우, 마우스 휠로 페이지를 스크롤할 수 있습니다.
				enabled: true,
	
				// 마우스 휠의 스크롤 속도를 설정하는 값입니다. 값이 클수록 스크롤 속도가 빨라집니다.
				factor: 1
			},
	
			// 화면 가장자리에서 마우스를 움직여 스크롤하는 기능 설정.
			scrollZones: {
	
				// true일 경우, 화면의 왼쪽 또는 오른쪽 가장자리에 마우스를 대면 자동으로 스크롤이 됩니다.
				enabled: true,
	
				// 스크롤 속도를 설정합니다. 값이 높을수록 더 빠르게 스크롤됩니다.
				speed: 15
			},
	
			// 마우스로 페이지를 드래그하여 스크롤하는 기능 설정.
			dragging: {
	
				// true일 경우, 사용자가 마우스로 페이지를 드래그해서 스크롤할 수 있습니다.
				enabled: true,
	
				// 마우스를 빠르게 움직인 후에도 스크롤이 계속되는 정도를 설정합니다. 0에 가까울수록 모멘텀이 적고, 1에 가까울수록 많습니다.
				momentum: 0.875,
	
				// 드래그가 인식되는 최소 이동 거리를 픽셀 단위로 설정합니다. 이 값을 넘어야 드래그로 인식됩니다.
				threshold: 10
			},
	
			// 이벤트가 특정 요소에서 발생했을 때 상위 요소로 전파되는 것을 막기 위한 선택자.
			excludeSelector: 'input:focus, select:focus, textarea:focus, audio, video, iframe',
	
			// 링크 클릭 시 스크롤 속도 설정 (밀리초 단위). 예를 들어, 1000ms는 1초 동안 스크롤이 일어납니다.
			linkScrollSpeed: 1000
		};
	
		// 자주 사용하는 DOM 요소들을 변수로 선언해둡니다. 나중에 빠르게 접근할 수 있습니다.
		let $window = $(window), // 현재 브라우저 창을 jQuery 객체로 선택.
			$document = $(document), // 현재 문서 전체를 jQuery 객체로 선택.
			$body = $('body'), // body 태그를 jQuery 객체로 선택.
			$html = $('html'), // html 태그를 jQuery 객체로 선택.
			$bodyHtml = $('body,html'), // body와 html 요소를 모두 선택. 보통 스크롤 제어를 위해 함께 사용.
			$wrapper = $('#wrapper'); // id가 'wrapper'인 요소를 선택. 페이지 콘텐츠를 감싸는 주요 요소.
	
		// 화면 크기에 따른 반응형 디자인을 적용하기 위한 브레이크포인트를 설정합니다.
		breakpoints({
			// 브레이크포인트 설정은 화면 크기별로 다른 스타일을 적용할 수 있게 도와줍니다.
			xlarge:   [ '1281px',  '1680px' ], // 가로 너비가 1281px에서 1680px 사이일 때.
			large:    [ '981px',   '1280px' ], // 가로 너비가 981px에서 1280px 사이일 때.
			medium:   [ '737px',   '980px'  ], // 가로 너비가 737px에서 980px 사이일 때.
			small:    [ '481px',   '736px'  ], // 가로 너비가 481px에서 736px 사이일 때.
			xsmall:   [ '361px',   '480px'  ], // 가로 너비가 361px에서 480px 사이일 때.
			xxsmall:  [ null,      '360px'  ], // 가로 너비가 최대 360px일 때.
			short:    '(min-aspect-ratio: 16/7)', // 가로와 세로의 비율이 16:7 이상일 때.
			xshort:   '(min-aspect-ratio: 16/6)'  // 가로와 세로의 비율이 16:6 이상일 때.
		});
	
		// 페이지가 처음 로드될 때 실행할 코드.
		$window.on('load', function() { // 브라우저 창에서 'load' 이벤트가 발생했을 때 실행.
			window.setTimeout(function() {
				$body.removeClass('is-preload'); // 'is-preload' 클래스를 제거하여 초기 로딩 상태에서 벗어납니다.
			}, 100); // 100ms 대기 후 실행됩니다.
		});
	
		// 특정 상황에서 페이지 동작을 변경하기 위한 트윅과 수정 사항.
		
		// 모바일 장치일 때 스크롤 설정을 다르게 적용.
		if (browser.mobile) { // 모바일 브라우저인 경우 이 코드가 실행됩니다.
	
			// 모바일에서는 키보드 단축키로 스크롤할 수 없도록 설정.
			settings.keyboardShortcuts.enabled = false;
	
			// 모바일에서는 스크롤 휠 사용을 비활성화.
			settings.scrollWheel.enabled = false;
	
			// 모바일에서 스크롤 영역 기능을 비활성화.
			settings.scrollZones.enabled = false;
	
			// 모바일에서는 마우스 드래그로 스크롤할 수 없도록 설정.
			settings.dragging.enabled = false;
	
			// 모바일에서는 가로 스크롤이 가능하도록 설정. (overlow-x: auto).
			$body.css('overflow-x', 'auto');
		}
	
		// 만약 브라우저가 Internet Explorer(IE)인 경우에만 적용할 수정 사항.
		if (browser.name == 'ie') { // 현재 브라우저가 Internet Explorer인 경우 실행.
	
			// body 태그에 'is-ie' 클래스를 추가하여 IE에서만 적용되는 스타일을 사용.
			$body.addClass('is-ie');
	
			// 페이지가 로드되거나 크기가 변경될 때 실행.
			$window.on('load resize', function() {
	
				// 래퍼의 너비를 계산하기 위한 변수를 선언.
				let w = 0;
	
				// wrapper 내부의 자식 요소들의 너비를 모두 더합니다.
				$wrapper.children().each(function() {
					w += $(this).width(); // 각 자식 요소의 너비를 더함.
				});
	
				// 계산한 전체 너비를 html 요소에 적용하여 IE에서도 페이지가 정상적으로 보이도록 설정.
				$html.css('width', w + 'px');
			});
		}
	
		// object-fit을 지원하지 않는 브라우저에서 이미지 배경을 처리하기 위한 코드.
		if (!browser.canUse('object-fit')) { // 'object-fit' 기능을 사용할 수 없는 경우 실행.
	
			// 데이터를 가진 이미지들에 대해 처리.
			$('.image[data-position]').each(function() { // 각 이미지에 대해 반복 실행.
	
				let $this = $(this), // 현재 선택된 요소를 변수에 저장.
					$img = $this.children('img'); // 현재 요소 안에 있는 img 태그를 선택.
	
				// img 요소 대신 div 요소의 배경으로 이미지를 설정합니다.
				$this
					.css('background-image', 'url("' + $img.attr('src') + '")') // 이미지 경로를 배경으로 설정.
					.css('background-position', $this.data('position')) // 이미지 배경 위치 설정.
					.css('background-size', 'cover') // 배경 이미지가 요소에 맞게 채워지도록 설정.
					.css('background-repeat', 'no-repeat'); // 배경 이미지가 반복되지 않도록 설정.
	
				// 실제 img 요소는 보이지 않게 숨깁니다.
				$img.css('opacity', '0');
			});
		}
	
		// 키보드 단축키 관련 설정.
		if (settings.keyboardShortcuts.enabled) // 키보드 단축키가 활성화된 경우에만 실행.
			(function() {
	
				// wrapper 요소에서 특정 이벤트를 차단.
				$wrapper.on('keypress keyup keydown', settings.excludeSelector, function(event) {
					// excludeSelector로 지정된 요소들에서 발생한 키보드 이벤트가 상위로 전파되지 않도록 합니다.
					event.stopPropagation(); // 이벤트 전파를 중단.
				});
	
				// 브라우저 창에서 키보드가 눌렸을 때 실행할 코드.
				$window.on('keydown', function(event) {
	
					let scrolled = false; // 스크롤 여부를 확인하기 위한 변수.
	
					// 눌린 키의 keyCode에 따라 스크롤 방향을 결정.
					switch (event.keyCode) {
	
						// 왼쪽 화살표 키.
						case 37:
							// 문서를 왼쪽으로 스크롤.
							$document.scrollLeft($document.scrollLeft() - settings.keyboardShortcuts.distance);
							scrolled = true;
							break;
	
						// 오른쪽 화살표 키.
						case 39:
							// 문서를 오른쪽으로 스크롤.
							$document.scrollLeft($document.scrollLeft() + settings.keyboardShortcuts.distance);
							scrolled = true;
							break;
	
						// Page Up 키.
						case 33:
							// 한 페이지 크기만큼 왼쪽으로 스크롤.
							$document.scrollLeft($document.scrollLeft() - $window.width() + 100);
							scrolled = true;
							break;
	
						// Page Down 또는 스페이스바 키.
						case 34:
						case 32:
							// 한 페이지 크기만큼 오른쪽으로 스크롤.
							$document.scrollLeft($document.scrollLeft() + $window.width() - 100);
							scrolled = true;
							break;
	
						// Home 키.
						case 36:
							// 문서를 처음으로 스크롤.
							$document.scrollLeft(0);
							scrolled = true;
							break;
	
						// End 키.
						case 35:
							// 문서를 끝으로 스크롤.
							$document.scrollLeft($document.width());
							scrolled = true;
							break;
					}
	
					// 스크롤이 일어났다면 기본 이벤트 중단.
					if (scrolled) {
						event.preventDefault(); // 기본 동작(화면 스크롤) 중단.
						event.stopPropagation(); // 이벤트 전파 중단.
	
						// 현재 진행 중인 스크롤 애니메이션을 중단.
						$bodyHtml.stop();
					}
				});
	
			})();
	
		// 마우스 휠을 사용한 스크롤 설정.
		if (settings.scrollWheel
	
})(jQuery)(function($) { // jQuery를 이용한 즉시 실행 함수 시작. $는 jQuery 객체를 나타냅니다.

    // 설정 값들을 담고 있는 객체를 생성.
    let settings = { // 다양한 기능에 대한 설정들을 저장할 객체

        // 키보드 단축키 설정.
        keyboardShortcuts: {

            // true일 경우, 키보드로 페이지 스크롤이 가능합니다.
            enabled: true,

            // 왼쪽/오른쪽 화살표 키를 눌렀을 때 이동할 거리(픽셀 단위)를 설정합니다.
            distance: 50
        },

        // 마우스 휠을 사용한 스크롤 설정.
        scrollWheel: {

            // true일 경우, 마우스 휠로 페이지를 스크롤할 수 있습니다.
            enabled: true,

            // 마우스 휠의 스크롤 속도를 설정하는 값입니다. 값이 클수록 스크롤 속도가 빨라집니다.
            factor: 1
        },

        // 화면 가장자리에서 마우스를 움직여 스크롤하는 기능 설정.
        scrollZones: {

            // true일 경우, 화면의 왼쪽 또는 오른쪽 가장자리에 마우스를 대면 자동으로 스크롤이 됩니다.
            enabled: true,

            // 스크롤 속도를 설정합니다. 값이 높을수록 더 빠르게 스크롤됩니다.
            speed: 15
        },

        // 마우스로 페이지를 드래그하여 스크롤하는 기능 설정.
        dragging: {

            // true일 경우, 사용자가 마우스로 페이지를 드래그해서 스크롤할 수 있습니다.
            enabled: true,

            // 마우스를 빠르게 움직인 후에도 스크롤이 계속되는 정도를 설정합니다. 0에 가까울수록 모멘텀이 적고, 1에 가까울수록 많습니다.
            momentum: 0.875,

            // 드래그가 인식되는 최소 이동 거리를 픽셀 단위로 설정합니다. 이 값을 넘어야 드래그로 인식됩니다.
            threshold: 10
        },

        // 이벤트가 특정 요소에서 발생했을 때 상위 요소로 전파되는 것을 막기 위한 선택자.
        excludeSelector: 'input:focus, select:focus, textarea:focus, audio, video, iframe',

        // 링크 클릭 시 스크롤 속도 설정 (밀리초 단위). 예를 들어, 1000ms는 1초 동안 스크롤이 일어납니다.
        linkScrollSpeed: 1000
    };

    // 자주 사용하는 DOM 요소들을 변수로 선언해둡니다. 나중에 빠르게 접근할 수 있습니다.
    let $window = $(window), // 현재 브라우저 창을 jQuery 객체로 선택.
        $document = $(document), // 현재 문서 전체를 jQuery 객체로 선택.
        $body = $('body'), // body 태그를 jQuery 객체로 선택.
        $html = $('html'), // html 태그를 jQuery 객체로 선택.
        $bodyHtml = $('body,html'), // body와 html 요소를 모두 선택. 보통 스크롤 제어를 위해 함께 사용.
        $wrapper = $('#wrapper'); // id가 'wrapper'인 요소를 선택. 페이지 콘텐츠를 감싸는 주요 요소.

    // 화면 크기에 따른 반응형 디자인을 적용하기 위한 브레이크포인트를 설정합니다.
    breakpoints({
        // 브레이크포인트 설정은 화면 크기별로 다른 스타일을 적용할 수 있게 도와줍니다.
        xlarge:   [ '1281px',  '1680px' ], // 가로 너비가 1281px에서 1680px 사이일 때.
        large:    [ '981px',   '1280px' ], // 가로 너비가 981px에서 1280px 사이일 때.
        medium:   [ '737px',   '980px'  ], // 가로 너비가 737px에서 980px 사이일 때.
        small:    [ '481px',   '736px'  ], // 가로 너비가 481px에서 736px 사이일 때.
        xsmall:   [ '361px',   '480px'  ], // 가로 너비가 361px에서 480px 사이일 때.
        xxsmall:  [ null,      '360px'  ], // 가로 너비가 최대 360px일 때.
        short:    '(min-aspect-ratio: 16/7)', // 가로와 세로의 비율이 16:7 이상일 때.
        xshort:   '(min-aspect-ratio: 16/6)'  // 가로와 세로의 비율이 16:6 이상일 때.
    });

    // 페이지가 처음 로드될 때 실행할 코드.
    $window.on('load', function() { // 브라우저 창에서 'load' 이벤트가 발생했을 때 실행.
        window.setTimeout(function() {
            $body.removeClass('is-preload'); // 'is-preload' 클래스를 제거하여 초기 로딩 상태에서 벗어납니다.
        }, 100); // 100ms 대기 후 실행됩니다.
    });

    // 특정 상황에서 페이지 동작을 변경하기 위한 트윅과 수정 사항.
    
    // 모바일 장치일 때 스크롤 설정을 다르게 적용.
    if (browser.mobile) { // 모바일 브라우저인 경우 이 코드가 실행됩니다.

        // 모바일에서는 키보드 단축키로 스크롤할 수 없도록 설정.
        settings.keyboardShortcuts.enabled = false;

        // 모바일에서는 스크롤 휠 사용을 비활성화.
        settings.scrollWheel.enabled = false;

        // 모바일에서 스크롤 영역 기능을 비활성화.
        settings.scrollZones.enabled = false;

        // 모바일에서는 마우스 드래그로 스크롤할 수 없도록 설정.
        settings.dragging.enabled = false;

        // 모바일에서는 가로 스크롤이 가능하도록 설정. (overlow-x: auto).
        $body.css('overflow-x', 'auto');
    }

    // 만약 브라우저가 Internet Explorer(IE)인 경우에만 적용할 수정 사항.
    if (browser.name == 'ie') { // 현재 브라우저가 Internet Explorer인 경우 실행.

        // body 태그에 'is-ie' 클래스를 추가하여 IE에서만 적용되는 스타일을 사용.
        $body.addClass('is-ie');

        // 페이지가 로드되거나 크기가 변경될 때 실행.
        $window.on('load resize', function() {

            // 래퍼의 너비를 계산하기 위한 변수를 선언.
            let w = 0;

            // wrapper 내부의 자식 요소들의 너비를 모두 더합니다.
            $wrapper.children().each(function() {
                w += $(this).width(); // 각 자식 요소의 너비를 더함.
            });

            // 계산한 전체 너비를 html 요소에 적용하여 IE에서도 페이지가 정상적으로 보이도록 설정.
            $html.css('width', w + 'px');
        });
    }

    // object-fit을 지원하지 않는 브라우저에서 이미지 배경을 처리하기 위한 코드.
    if (!browser.canUse('object-fit')) { // 'object-fit' 기능을 사용할 수 없는 경우 실행.

        // 데이터를 가진 이미지들에 대해 처리.
        $('.image[data-position]').each(function() { // 각 이미지에 대해 반복 실행.

            let $this = $(this), // 현재 선택된 요소를 변수에 저장.
                $img = $this.children('img'); // 현재 요소 안에 있는 img 태그를 선택.

            // img 요소 대신 div 요소의 배경으로 이미지를 설정합니다.
            $this
                .css('background-image', 'url("' + $img.attr('src') + '")') // 이미지 경로를 배경으로 설정.
                .css('background-position', $this.data('position')) // 이미지 배경 위치 설정.
                .css('background-size', 'cover') // 배경 이미지가 요소에 맞게 채워지도록 설정.
                .css('background-repeat', 'no-repeat'); // 배경 이미지가 반복되지 않도록 설정.

            // 실제 img 요소는 보이지 않게 숨깁니다.
            $img.css('opacity', '0');
        });
    }

    // 키보드 단축키 관련 설정.
    if (settings.keyboardShortcuts.enabled) // 키보드 단축키가 활성화된 경우에만 실행.
        (function() {

            // wrapper 요소에서 특정 이벤트를 차단.
            $wrapper.on('keypress keyup keydown', settings.excludeSelector, function(event) {
                // excludeSelector로 지정된 요소들에서 발생한 키보드 이벤트가 상위로 전파되지 않도록 합니다.
                event.stopPropagation(); // 이벤트 전파를 중단.
            });

            // 브라우저 창에서 키보드가 눌렸을 때 실행할 코드.
            $window.on('keydown', function(event) {

                let scrolled = false; // 스크롤 여부를 확인하기 위한 변수.

                // 눌린 키의 keyCode에 따라 스크롤 방향을 결정.
                switch (event.keyCode) {

                    // 왼쪽 화살표 키.
                    case 37:
                        // 문서를 왼쪽으로 스크롤.
                        $document.scrollLeft($document.scrollLeft() - settings.keyboardShortcuts.distance);
                        scrolled = true;
                        break;

                    // 오른쪽 화살표 키.
                    case 39:
                        // 문서를 오른쪽으로 스크롤.
                        $document.scrollLeft($document.scrollLeft() + settings.keyboardShortcuts.distance);
                        scrolled = true;
                        break;

                    // Page Up 키.
                    case 33:
                        // 한 페이지 크기만큼 왼쪽으로 스크롤.
                        $document.scrollLeft($document.scrollLeft() - $window.width() + 100);
                        scrolled = true;
                        break;

                    // Page Down 또는 스페이스바 키.
                    case 34:
                    case 32:
                        // 한 페이지 크기만큼 오른쪽으로 스크롤.
                        $document.scrollLeft($document.scrollLeft() + $window.width() - 100);
                        scrolled = true;
                        break;

                    // Home 키.
                    case 36:
                        // 문서를 처음으로 스크롤.
                        $document.scrollLeft(0);
                        scrolled = true;
                        break;

                    // End 키.
                    case 35:
                        // 문서를 끝으로 스크롤.
                        $document.scrollLeft($document.width());
                        scrolled = true;
                        break;
                }

                // 스크롤이 일어났다면 기본 이벤트 중단.
                if (scrolled) {
                    event.preventDefault(); // 기본 동작(화면 스크롤) 중단.
                    event.stopPropagation(); // 이벤트 전파 중단.

                    // 현재 진행 중인 스크롤 애니메이션을 중단.
                    $bodyHtml.stop();
                }
            });

        })();

    // 마우스 휠을 사용한 스크롤 설정.
    if (settings.scrollWheel.enabled) // 스크롤 휠이 활성화된 경우에만 실행.
        (function() {

            // 마우스 휠 이벤트를 표준화하여 처리하는 함수.
            let normalizeWheel = function(event) {

                let pixelStep = 10, // 픽셀 단위로 이동할 기본 크기.
                    lineHeight = 40, // 한 줄의 높이.
                    pageHeight = 800, // 한 페이지의 높이.
                    sX = 0, // 가로 방향 스크롤 값.
                    sY = 0, // 세로 방향 스크롤 값.
                    pX = 0, // 가로 픽셀 이동 값.
                    pY = 0; // 세로 픽셀 이동 값.

                // 레거시 브라우저 지원 (스크롤 이벤트 방식이 다른 경우 처리).
                if ('detail' in event) // FF에서 사용되는 detail 속성으로 스크롤 값 가져오기.
                    sY = event.detail;
                else if ('wheelDelta' in event) // IE에서 사용되는 wheelDelta 속성.
                    sY = event.wheelDelta / -120;
                else if ('wheelDeltaY' in event) // 휠 델타 Y축 값 가져오기.
                    sY = event.wheelDeltaY / -120;

                if ('wheelDeltaX' in event) // 휠 델타 X축 값 가져오기.
                    sX = event.wheelDeltaX / -120;

                // FF에서 DOMMouseScroll 이벤트로 가로 스크롤 처리.
                if ('axis' in event && event.axis === event.HORIZONTAL_AXIS) {
                    sX = sY; // 가로 스크롤 값으로 세로 값을 사용.
                    sY = 0;
                }

                // 픽셀 이동 값을 계산.
                pX = sX * pixelStep; // 가로 이동 값을 계산.
                pY = sY * pixelStep; // 세로 이동 값을 계산.

                // 스크롤 이벤트에서 세로 방향 이동 값을 직접 가져옴.
                if ('deltaY' in event)
                    pY = event.deltaY;

                if ('deltaX' in event)
                    pX = event.deltaX;

                // 특정 스크롤 모드에서 처리.
                if ((pX || pY) && event.deltaMode) {
                    if (event.deltaMode == 1) { // 줄 단위 스크롤인 경우.
                        pX *= lineHeight;
                        pY *= lineHeight;
                    } else { // 페이지 단위 스크롤인 경우.
                        pX *= pageHeight;
                        pY *= pageHeight;
                    }
                }

                // 스크롤 방향과 크기 값을 계산.
                return {
                    spinX: sX, // 가로 방향 스크롤 값.
                    spinY: sY, // 세로 방향 스크롤 값.
                    pixelX: pX, // 가로 방향 픽셀 이동 값.
                    pixelY: pY  // 세로 방향 픽셀 이동 값.
                };
            };

            // 마우스 휠 이벤트에 대한 처리.
            $body.on('wheel', function(event) {

                // 작은 화면에서는 휠 스크롤 비활성화.
                if (breakpoints.active('<=small'))
                    return;

                // 기본 스크롤 동작 중단.
                event.preventDefault();
                event.stopPropagation();

                // 현재 진행 중인 스크롤 애니메이션을 중단.
                $bodyHtml.stop();

                // 스크롤 이벤트를 표준화하여 방향과 크기를 계산.
                let n = normalizeWheel(event.originalEvent),
                    x = (n.pixelX != 0 ? n.pixelX : n.pixelY), // 가로 또는 세로 스크롤 값을 선택.
                    delta = Math.min(Math.abs(x), 150) * settings.scrollWheel.factor, // 스크롤 속도 조절.
                    direction = x > 0 ? 1 : -1; // 스크롤 방향 설정.

                // 페이지를 가로 방향으로 스크롤.
                $document.scrollLeft($document.scrollLeft() + (delta * direction));
            });
        })();

})(jQuery); // jQuery 문법을 사용하여 모든 코드가 즉시 실행되도록 설정.