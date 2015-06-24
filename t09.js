var $produts = jQuery('.products > .productGroup > .product');
var url = (function (parser) {
	return function (src) {
		var info = {};

		parser.href = src;

		return {
			href : parser.href,
			pathname : parser.pathname,
			search : parser.search,
			protocol : parser.protocol,
			origin : parser.origin,
			searchParams : (function (searchString) {
				var params = {};
				var buffer = [];
				var searchNodes = [];

				searchString = searchString.replace('?', '');

				searchNodes = searchString.split('&');

				for (var i = 0; i < searchNodes.length; i += 1) {
					buffer = searchNodes[i].split('=');
					params[buffer[0]] = buffer[1] || '';
				}

				return params;
			})(parser.search)
		};
	};
})(document.createElement('a'));
var imgReplacer = function (path, imgToReplace, options) {
	var imgReplaced = imgToReplace.cloneNode(false);

	imgReplaced.src = path;
	imgToReplace.parentNode.replaceChild(imgReplaced, imgToReplace);

	if (options) {
		for (var attr in options) {
			if (options.hasOwnProperty(attr)) {
				imgReplaced[attr] = options[attr];
			}
		}
	}
};


$produts.each(function () {
	var $item = jQuery(this);
	var $imgIcon = $item.find('.product-img');
	var $colors = $item.find('.color');
	var src = url($imgIcon.prop('src'));
	var imgPath = src.origin +
					src.pathname.replace('AmericanApparel/ol_freeform', src.searchParams.$product_img) +
					'?defaultImage=' + src.searchParams.defaultImage +
					'&$ProductImage$';

	imgReplacer(imgPath, $imgIcon[0], {
		id : $imgIcon.prop('id'),
		alt : $imgIcon.prop('alt'),
		title : $imgIcon.prop('title'),
		class : $imgIcon.prop('class'),
	});

	$item.find('.color').each(function () {
		var $color = jQuery(this);
		var dataImage = $color.data('image');
		var srcImage = url(dataImage);

		dataImage = srcImage.origin +
					srcImage.pathname.replace('AmericanApparel/ol_freeform', srcImage.searchParams.$product_img) +
					'?defaultImage=' + srcImage.searchParams.defaultImage +
					'&$ProductImage$';

		$color.attr('data-image', dataImage);
	});
}).css({
	'width' : '33%',
	'padding-left' : 5,
	'padding-right' : 5
});