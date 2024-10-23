/*
    Ethereal by HTML5 UP
    html5up.net | @ajlkn (html5up.net/license)
*/

(function($) { // jQuery를 이용한 함수 시작

    // 설정.
let settings = { // 설정 변수를 선언하는 부분

            // 키보드 단축키.
                keyboardShortcuts: {

                    // true일 경우, 키보드 단축키로 스크롤이 가능합니다.
                        enabled: true,

                    // 왼쪽/오른쪽 화살표 키로 스크롤할 때 이동할 거리를 설정합니다.
                        distance: 50

                },

            // 스크롤 휠.
                scrollWheel: {

                    // true일 경우, 스크롤 휠로 스크롤할 수 있습니다.
                        enabled: true,

                    // 스크롤 휠의 비율을 설정합니다. (일반적으로 0에서 1 사이의 값으로 설정. 값이 낮을수록 스크롤 속도가 느려짐)
                        factor: 1

                },

            // 스크롤 영역.
                scrollZones: {

                    // true일 경우, 화면 왼쪽/오른쪽 가장자리에서 스크롤 영역을 통해 스크롤할 수 있습니다.
                        enabled: true,

                    // 스크롤 영역이 활성화되었을 때 페이지가 스크롤되는 속도를 설정합니다 (값이 높을수록 스크롤 속도가 빨라집니다).
                        speed: 15

                },

            // 드래그.
                dragging: {

                    // true일 경우, 마우스로 메인 래퍼를 드래그하여 스크롤할 수 있습니다.
                        enabled: true,

                    // 모멘텀 값을 설정합니다. 0에서 1 사이의 값이어야 합니다 (값이 낮을수록 모멘텀이 적어짐, 0일 경우 모멘텀 스크롤 비활성화).
                        momentum: 0.875,

                    // 드래그 임계값을 설정합니다 (픽셀 단위).
                        threshold: 10

                },

            // 유효한 선택자가 설정되면, 이 요소에서 발생하는 키/마우스 이벤트가 상위로 전파되지 않도록 방지합니다.
                excludeSelector: 'input:focus, select:focus, textarea:focus, audio, video, iframe',

            // 링크 스크롤 속도.
                linkScrollSpeed: 1000

        };

    // 변수 선언.
    let $window = $(window),
        $document = $(document),
        $body = $('body'),
        $html = $('html'),
        $bodyHtml = $('body,html'),
        $wrapper = $('#wrapper');

    // 브레이크포인트 설정.
    breakpoints({
        xlarge:   [ '1281px',  '1680px' ],
        large:    [ '981px',   '1280px' ],
        medium:   [ '737px',   '980px'  ],
        small:    [ '481px',   '736px'  ],
        xsmall:   [ '361px',   '480px'  ],
        xxsmall:  [ null,      '360px'  ],
        short:    '(min-aspect-ratio: 16/7)',
        xshort:   '(min-aspect-ratio: 16/6)'
    });

    // 페이지 로드 시 초기 애니메이션 실행.
    $window.on('load', function() {
        window.setTimeout(function() {
            $body.removeClass('is-preload');
        }, 100);
    });

    // 트윅 및 수정사항.

        // 모바일: 기본 스크롤로 복귀.
        if (browser.mobile) {

            // 모든 스크롤 보조 기능 비활성화.
            settings.keyboardShortcuts.enabled = false;
            settings.scrollWheel.enabled = false;
            settings.scrollZones.enabled = false;
            settings.dragging.enabled = false;

            // body의 오버플로우-x를 재활성화.
            $body.css('overflow-x', 'auto');

        }

    // IE: 여러 가지 수정사항.
    if (browser.name == 'ie') {

        // IE 모드 활성화.
        $body.addClass('is-ie');

        // 페이지 너비 설정.
        $window
            .on('load resize', function() {

                // 래퍼의 너비 계산.
                let w = 0;

                $wrapper.children().each(function() {
                    w += $(this).width();
                });

                // 페이지에 적용.
                $html.css('width', w + 'px');

            });

    }

    // 폴리필: object-fit.
    if (!browser.canUse('object-fit')) {

        $('.image[data-position]').each(function() {

            let $this = $(this),
                $img = $this.children('img');

            // img를 배경으로 설정.
            $this
                .css('background-image', 'url("' + $img.attr('src') + '")')
                .css('background-position', $this.data('position'))
                .css('background-size', 'cover')
                .css('background-repeat', 'no-repeat');

            // img 숨기기.
            $img
                .css('opacity', '0');

        });

    }

    // 키보드 단축키.
    if (settings.keyboardShortcuts.enabled)
        (function() {

            $wrapper

                // 제외된 요소 내에서 발생한 키 입력 이벤트가 상위로 전파되지 않도록 방지.
                    .on('keypress keyup keydown', settings.excludeSelector, function(event) {

                        // 이벤트 전파 중단.
                            event.stopPropagation();

                    });

            $window

                // 키 입력 이벤트.
                    .on('keydown', function(event) {

                        let scrolled = false;

                        switch (event.keyCode) {

                            // 왼쪽 화살표.
                                case 37:
                                    $document.scrollLeft($document.scrollLeft() - settings.keyboardShortcuts.distance);
                                    scrolled = true;
                                    break;

                            // 오른쪽 화살표.
                                case 39:
                                    $document.scrollLeft($document.scrollLeft() + settings.keyboardShortcuts.distance);
                                    scrolled = true;
                                    break;

                            // Page Up.
                                case 33:
                                    $document.scrollLeft($document.scrollLeft() - $window.width() + 100);
                                    scrolled = true;
                                    break;

                            // Page Down, Space.
                                case 34:
                                case 32:
                                    $document.scrollLeft($document.scrollLeft() + $window.width() - 100);
                                    scrolled = true;
                                    break;

                            // Home.
                                case 36:
                                    $document.scrollLeft(0);
                                    scrolled = true;
                                    break;

                            // End.
                                case 35:
                                    $document.scrollLeft($document.width());
                                    scrolled = true;
                                    break;

                        }

                        // 스크롤되었는가?
                            if (scrolled) {

                                // 기본 동작 중단.
                                    event.preventDefault();
                                    event.stopPropagation();

                                // 링크 스크롤 중단.
                                    $bodyHtml.stop();

                            }

                    });

        })();

    // 스크롤 휠.
    if (settings.scrollWheel.enabled)
        (function() {

            // Facebook의 @miorel + @pieterv 코드 기반 (감사합니다 여러분 :)
            // github.com/facebook/fixed-data-table/blob/master/src/vendor_upstream/dom/normalizeWheel.js
                let normalizeWheel = function(event) {

                    let pixelStep = 10,
                        lineHeight = 40,
                        pageHeight = 800,
                        sX = 0,
                        sY = 0,
                        pX = 0,
                        pY = 0;

                    // 레거시 지원.
                        if ('detail' in event)
                            sY = event.detail;
                        else if ('wheelDelta' in event)
                            sY = event.wheelDelta / -120;
                        else if ('wheelDeltaY' in event)
                            sY = event.wheelDeltaY / -120;

                        if ('wheelDeltaX' in event)
                            sX = event.wheelDeltaX / -120;

                    // FF에서 DOMMouseScroll을 사용한 가로 스크롤.
                        if ('axis' in event
                        &&    event.axis === event.HORIZONTAL_AXIS) {
                            sX = sY;
                            sY = 0;
                        }

                    // 계산.
                        pX = sX * pixelStep;
                        pY = sY * pixelStep;

                        if ('deltaY' in event)
                            pY = event.deltaY;

                        if ('deltaX' in event)
                            pX = event.deltaX;

                        if ((pX || pY)
                        &&    event.deltaMode) {

                            if (event.deltaMode == 1) {
                                pX *= lineHeight;
                                pY *= lineHeight;
                            }
                            else {
                                pX *= pageHeight;
                                pY *= pageHeight;
                            }

                        }

                    // 스핀을 결정할 수 없는 경우 대체.
                        if (pX && !sX)
                            sX = (pX < 1) ? -1 : 1;

                        if (pY && !sY)
                            sY = (pY < 1) ? -1 : 1;

                    // 반환.
                       


						// Return.
							return {
								spinX: sX,
								spinY: sY,
								pixelX: pX,
								pixelY: pY
							};

					};

				// Wheel event.
					$body.on('wheel', function(event) {

						// Disable on <=small.
							if (breakpoints.active('<=small'))
								return;

						// Prevent default.
							event.preventDefault();
							event.stopPropagation();

						// Stop link scroll.
							$bodyHtml.stop();

						// Calculate delta, direction.
							var	n = normalizeWheel(event.originalEvent),
								x = (n.pixelX != 0 ? n.pixelX : n.pixelY),
								delta = Math.min(Math.abs(x), 150) * settings.scrollWheel.factor,
								direction = x > 0 ? 1 : -1;

						// Scroll page.
							$document.scrollLeft($document.scrollLeft() + (delta * direction));

					});

			})();

	// Scroll zones.
		if (settings.scrollZones.enabled)
			(function() {

				var	$left = $('<div class="scrollZone left"></div>'),
					$right = $('<div class="scrollZone right"></div>'),
					$zones = $left.add($right),
					paused = false,
					intervalId = null,
					direction,
					activate = function(d) {

						// Disable on <=small.
							if (breakpoints.active('<=small'))
								return;

						// Paused? Bail.
							if (paused)
								return;

						// Stop link scroll.
							$bodyHtml.stop();

						// Set direction.
							direction = d;

						// Initialize interval.
							clearInterval(intervalId);

							intervalId = setInterval(function() {
								$document.scrollLeft($document.scrollLeft() + (settings.scrollZones.speed * direction));
							}, 25);

					},
					deactivate = function() {

						// Unpause.
							paused = false;

						// Clear interval.
							clearInterval(intervalId);

					};

				$zones
					.appendTo($wrapper)
					.on('mouseleave mousedown', function(event) {
						deactivate();
					});

				$left
					.css('left', '0')
					.on('mouseenter', function(event) {
						activate(-1);
					});

				$right
					.css('right', '0')
					.on('mouseenter', function(event) {
						activate(1);
					});

				$wrapper
					.on('---pauseScrollZone', function(event) {

						// Pause.
							paused = true;

						// Unpause after delay.
							setTimeout(function() {
								paused = false;
							}, 500);

					});

			})();

	// Dragging.
		if (settings.dragging.enabled)
			(function() {

				var dragging = false,
					dragged = false,
					distance = 0,
					startScroll,
					momentumIntervalId, velocityIntervalId,
					startX, currentX, previousX,
					velocity, direction;

				$wrapper

					// Prevent image drag and drop.
						.on('mouseup mousemove mousedown', '.image, img', function(event) {
							event.preventDefault();
						})

					// Prevent mouse events inside excluded elements from bubbling.
						.on('mouseup mousemove mousedown', settings.excludeSelector, function(event) {

							// Prevent event from bubbling.
								event.stopPropagation();

							// End drag.
								dragging = false;
								$wrapper.removeClass('is-dragging');
								clearInterval(velocityIntervalId);
								clearInterval(momentumIntervalId);

							// Pause scroll zone.
								$wrapper.triggerHandler('---pauseScrollZone');

						})

					// Mousedown event.
						.on('mousedown', function(event) {

							// Disable on <=small.
								if (breakpoints.active('<=small'))
									return;

							// Clear momentum interval.
								clearInterval(momentumIntervalId);

							// Stop link scroll.
								$bodyHtml.stop();

							// Start drag.
								dragging = true;
								$wrapper.addClass('is-dragging');

							// Initialize and reset vars.
								startScroll = $document.scrollLeft();
								startX = event.clientX;
								previousX = startX;
								currentX = startX;
								distance = 0;
								direction = 0;

							// Initialize velocity interval.
								clearInterval(velocityIntervalId);

								velocityIntervalId = setInterval(function() {

									// Calculate velocity, direction.
										velocity = Math.abs(currentX - previousX);
										direction = (currentX > previousX ? -1 : 1);

									// Update previous X.
										previousX = currentX;

								}, 50);

						})

					// Mousemove event.
						.on('mousemove', function(event) {

							// Not dragging? Bail.
								if (!dragging)
									return;

							// Velocity.
								currentX = event.clientX;

							// Scroll page.
								$document.scrollLeft(startScroll + (startX - currentX));

							// Update distance.
								distance = Math.abs(startScroll - $document.scrollLeft());

							// Distance exceeds threshold? Disable pointer events on all descendents.
								if (!dragged
								&&	distance > settings.dragging.threshold) {

									$wrapper.addClass('is-dragged');

									dragged = true;

								}

						})

					// Mouseup/mouseleave event.
						.on('mouseup mouseleave', function(event) {

							var m;

							// Not dragging? Bail.
								if (!dragging)
									return;

							// Dragged? Re-enable pointer events on all descendents.
								if (dragged) {

									setTimeout(function() {
										$wrapper.removeClass('is-dragged');
									}, 100);

									dragged = false;

								}

							// Distance exceeds threshold? Prevent default.
								if (distance > settings.dragging.threshold)
									event.preventDefault();

							// End drag.
								dragging = false;
								$wrapper.removeClass('is-dragging');
								clearInterval(velocityIntervalId);
								clearInterval(momentumIntervalId);

							// Pause scroll zone.
								$wrapper.triggerHandler('---pauseScrollZone');

							// Initialize momentum interval.
								if (settings.dragging.momentum > 0) {

									m = velocity;

									momentumIntervalId = setInterval(function() {

										// Momentum is NaN? Bail.
											if (isNaN(m)) {

												clearInterval(momentumIntervalId);
												return;

											}

										// Scroll page.
											$document.scrollLeft($document.scrollLeft() + (m * direction));

										// Decrease momentum.
											m = m * settings.dragging.momentum;

										// Negligible momentum? Clear interval and end.
											if (Math.abs(m) < 1)
												clearInterval(momentumIntervalId);

									}, 15);

								}

						});

			})();

	// Link scroll.
		$wrapper
			.on('mousedown mouseup', 'a[href^="#"]', function(event) {

				// Stop propagation.
					event.stopPropagation();

			})
			.on('click', 'a[href^="#"]', function(event) {

				var	$this = $(this),
					href = $this.attr('href'),
					$target, x, y;

				// Get target.
					if (href == '#'
					||	($target = $(href)).length == 0)
						return;

				// Prevent default.
					event.preventDefault();
					event.stopPropagation();

				// Calculate x, y.
					if (breakpoints.active('<=small')) {

						x = $target.offset().top - (Math.max(0, $window.height() - $target.outerHeight()) / 2);
						y = { scrollTop: x };

					}
					else {

						x = $target.offset().left - (Math.max(0, $window.width() - $target.outerWidth()) / 2);
						y = { scrollLeft: x };

					}

				// Scroll.
					$bodyHtml
						.stop()
						.animate(
							y,
							settings.linkScrollSpeed,
							'swing'
						);

			});

	// 갤러리.
	$('.gallery')
		.on('click', 'a', function(event) {

			let $a = $(this),
			$gallery = $a.parents('.gallery'), // 갤러리 요소에서 모달에 링크된 부모 요소 가져오기
			$modal = $gallery.children('.modal'), // 갤러리 안의 모달 요소 가져오기
			$modalImg = $modal.find('img'), // 모달 내에서 이미지 요소 선택
			$modalTitle = $modal.find('.title'),  // 모달 내에서 제목을 표시할 요소 선택
			href = $a.attr('href'), // 클릭한 링크의 href 속성(이미지 경로) 가져오기
			title = $a.data('title');  // 클릭한 a 태그의 data-title 속성(이미지 제목) 가져오기
		
			// 이미지가 아닌 경우 중단.
			if (!href.match(/\.(jpg|gif|png|mp4)$/))
				return;

			// 기본 동작 중단.
			event.preventDefault();
			event.stopPropagation();

			// 잠금 상태인 경우 중단.
			if ($modal[0]._locked)
				return;

			// 잠금.
			$modal[0]._locked = true;

			// 이미지 경로 설정.
			$modalImg.attr('src', href);

			// 제목 설정.
			if (title) {
				$modalTitle.text(title);  // 모달 내에 제목 표시
			} else {
				$modalTitle.text('');  // 제목이 없으면 빈 값
			}

			// 모달 표시 설정.
			$modal.addClass('visible');

			// 포커스 설정.
			$modal.focus();

			// 일정 시간 후 잠금 해제.
			setTimeout(function() {
				$modal[0]._locked = false;
			}, 600);
		})
		.on('click', '.modal', function(event) {

			let $modal = $(this),
				$modalImg = $modal.find('img'),
				$modalTitle = $modal.find('.title');  // 제목 요소

			// 잠금 상태인 경우 중단.
			if ($modal[0]._locked)
				return;

			// 이미 숨겨진 경우 중단.
			if (!$modal.hasClass('visible'))
				return;

			// 이벤트 전파 중단.
			event.stopPropagation();

			// 잠금.
			$modal[0]._locked = true;

			// visible, loaded 클래스 제거.
			$modal
				.removeClass('loaded');

			// 일정 시간 후 처리.
			setTimeout(function() {
				$modal
					.removeClass('visible');

				// 스크롤 영역 일시 중지.
				$wrapper.triggerHandler('---pauseScrollZone');

				setTimeout(function() {

					// 이미지 경로 초기화.
					$modalImg.attr('src', '');
					
					// 제목 초기화.
					$modalTitle.text('');  // 제목도 초기화

					// 잠금 해제.
					$modal[0]._locked = false;

					// 포커스 설정.
					$body.focus();

				}, 475);

			}, 125);

		})
		.on('keypress', '.modal', function(event) {

			let $modal = $(this);

			// Esc 키를 누르면 모달 닫기.
			if (event.keyCode == 27)
				$modal.trigger('click');

		})
		.on('mouseup mousedown mousemove', '.modal', function(event) {

			// 이벤트 전파 중단.
			event.stopPropagation();

		})
		// 여기서 모달을 동적으로 생성합니다. .title 요소도 추가
		.prepend('<div class="modal" tabIndex="-1"><div class="inner"><img src="" /><div class="title"></div></div></div>')
		.find('img')
		.on('load', function(event) {

			let $modalImg = $(this),
				$modal = $modalImg.parents('.modal');

			setTimeout(function() {

				// visible 상태가 아닌 경우 중단.
				if (!$modal.hasClass('visible'))
					return;

				// loaded 클래스 설정.
				$modal.addClass('loaded');

			}, 275);

		});


})(jQuery);   // javascript 에도 .off() 가 있습니다. 마치 java의 .close() 와 같은 기능입니다.
