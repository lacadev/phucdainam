/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./block-gutenberg/news-list-block/edit.js":
/*!*************************************************!*\
  !*** ./block-gutenberg/news-list-block/edit.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Edit; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_7__);



function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }






// ── PostImage component ────────────────────────────────────────────────────────
function PostImage(_ref) {
  var _media$media_details, _media$media_details2;
  var id = _ref.id;
  var media = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_6__.useSelect)(function (select) {
    if (!id || isNaN(parseInt(id))) return null;
    return select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_7__.store).getMedia(id);
  }, [id]);
  if (!media) {
    return (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
      className: "laca-news-list__img-placeholder"
    });
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("img", {
    src: ((_media$media_details = media.media_details) === null || _media$media_details === void 0 || (_media$media_details = _media$media_details.sizes) === null || _media$media_details === void 0 || (_media$media_details = _media$media_details.medium_large) === null || _media$media_details === void 0 ? void 0 : _media$media_details.source_url) || ((_media$media_details2 = media.media_details) === null || _media$media_details2 === void 0 || (_media$media_details2 = _media$media_details2.sizes) === null || _media$media_details2 === void 0 || (_media$media_details2 = _media$media_details2.medium) === null || _media$media_details2 === void 0 ? void 0 : _media$media_details2.source_url) || media.source_url,
    alt: media.alt_text || '',
    className: "laca-news-list__img"
  });
}

// ── Main Edit component ────────────────────────────────────────────────────────
function Edit(_ref2) {
  var attributes = _ref2.attributes,
    setAttributes = _ref2.setAttributes;
  var title = attributes.title,
    subtitle = attributes.subtitle,
    orderBy = attributes.orderBy,
    selectedCats = attributes.selectedCats,
    postsCount = attributes.postsCount,
    viewAllUrl = attributes.viewAllUrl,
    viewAllText = attributes.viewAllText,
    showExcerpt = attributes.showExcerpt,
    showCategory = attributes.showCategory;
  var blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.useBlockProps)({
    className: 'laca-news-list'
  });

  // ── Taxonomy list (category) ───────────────────────────────────────────────
  var categories = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_6__.useSelect)(function (select) {
    return select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_7__.store).getEntityRecords('taxonomy', 'category', {
      per_page: -1,
      hide_empty: false,
      _fields: 'id,name,slug'
    });
  }, []);

  // ── Preview posts trong editor ─────────────────────────────────────────────
  var _useSelect = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_6__.useSelect)(function (select) {
      var _select = select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_7__.store),
        getEntityRecords = _select.getEntityRecords,
        isResolving = _select.isResolving;
      var query = {
        per_page: postsCount,
        status: 'publish',
        _embed: true
      };
      if (orderBy === 'rand') {
        query.orderby = 'date'; // editor dùng date thay rand để ổn định
        query.order = 'desc';
      } else if (orderBy === 'comment_count') {
        query.orderby = 'comment_count';
        query.order = 'desc';
      } else {
        query.orderby = 'date';
        query.order = 'desc';
      }
      if (selectedCats && selectedCats.length > 0) {
        query.categories = selectedCats.join(',');
      }
      var records = getEntityRecords('postType', 'post', query);
      var loading = isResolving('getEntityRecords', ['postType', 'post', query]);
      return {
        previewPosts: records || [],
        isLoadingPosts: loading
      };
    }, [postsCount, selectedCats, orderBy]),
    previewPosts = _useSelect.previewPosts,
    isLoadingPosts = _useSelect.isLoadingPosts;

  // ── Category checkbox handler ──────────────────────────────────────────────
  var toggleCat = function toggleCat(catId) {
    var next = selectedCats.includes(catId) ? selectedCats.filter(function (id) {
      return id !== catId;
    }) : [].concat((0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(selectedCats), [catId]);
    setAttributes({
      selectedCats: next
    });
  };

  // ── Order options ──────────────────────────────────────────────────────────
  var orderOptions = [{
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Mới nhất', 'lacadev'),
    value: 'date'
  }, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Xem nhiều nhất', 'lacadev'),
    value: 'comment_count'
  }, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Ngẫu nhiên', 'lacadev'),
    value: 'rand'
  }];

  // ── Excerpt: cắt ngắn ─────────────────────────────────────────────────────
  var trimExcerpt = function trimExcerpt(str) {
    var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
    if (!str) return '';
    var p = document.createElement('p');
    p.innerHTML = str;
    var text = p.textContent || p.innerText || '';
    return text.length > max ? text.slice(0, max) + '…' : text;
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(react__WEBPACK_IMPORTED_MODULE_2__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Cài đặt hiển thị', 'lacadev'),
    initialOpen: true
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Sắp xếp theo', 'lacadev'),
    value: orderBy,
    options: orderOptions,
    onChange: function onChange(val) {
      return setAttributes({
        orderBy: val
      });
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Số bài hiển thị', 'lacadev'),
    value: postsCount,
    onChange: function onChange(val) {
      return setAttributes({
        postsCount: val
      });
    },
    min: 1,
    max: 12
  }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Hiển thị mô tả ngắn', 'lacadev'),
    checked: showExcerpt,
    onChange: function onChange(val) {
      return setAttributes({
        showExcerpt: val
      });
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Hiển thị danh mục', 'lacadev'),
    checked: showCategory,
    onChange: function onChange(val) {
      return setAttributes({
        showCategory: val
      });
    }
  })), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Lọc theo danh mục', 'lacadev'),
    initialOpen: false
  }, !categories ? (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.Spinner, null) : categories.map(function (cat) {
    return (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.CheckboxControl, {
      key: cat.id,
      label: cat.name,
      checked: selectedCats.includes(cat.id),
      onChange: function onChange() {
        return toggleCat(cat.id);
      }
    });
  }), selectedCats.length > 0 && (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("p", {
    style: {
      marginTop: '8px'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("button", {
    type: "button",
    onClick: function onClick() {
      return setAttributes({
        selectedCats: []
      });
    },
    style: {
      background: 'none',
      border: 'none',
      padding: 0,
      color: '#007cba',
      cursor: 'pointer',
      fontSize: '12px'
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Bỏ lọc tất cả', 'lacadev')))), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Nút xem tất cả', 'lacadev'),
    initialOpen: false
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('URL', 'lacadev'),
    value: viewAllUrl,
    type: "url",
    placeholder: "https://...",
    onChange: function onChange(val) {
      return setAttributes({
        viewAllUrl: val
      });
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Nhãn nút', 'lacadev'),
    value: viewAllText,
    onChange: function onChange(val) {
      return setAttributes({
        viewAllText: val
      });
    }
  }))), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("section", _objectSpread({}, blockProps), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "container-fluid"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "laca-news-list__header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "laca-news-list__header-text"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.RichText, {
    tagName: "span",
    className: "laca-news-list__subtitle",
    value: subtitle,
    onChange: function onChange(val) {
      return setAttributes({
        subtitle: val
      });
    },
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Sub-tiêu đề…', 'lacadev')
  }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.RichText, {
    tagName: "h2",
    className: "laca-news-list__title",
    value: title,
    onChange: function onChange(val) {
      return setAttributes({
        title: val
      });
    },
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Tiêu đề…', 'lacadev')
  })), viewAllUrl && viewAllText && (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
    className: "laca-news-list__view-all btn btn-primary"
  }, viewAllText)), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("hr", {
    className: "laca-news-list__divider"
  }), isLoadingPosts ? (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    style: {
      padding: '2rem',
      textAlign: 'center'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.Spinner, null)) : (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "laca-news-list__grid"
  }, previewPosts.length === 0 && (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("p", {
    style: {
      color: '#999'
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Không có bài viết nào phù hợp.', 'lacadev')), previewPosts.map(function (post) {
    var _post$_embedded, _post$_embedded2, _post$excerpt, _post$title;
    var thumbnailId = post.featured_media || (post === null || post === void 0 || (_post$_embedded = post._embedded) === null || _post$_embedded === void 0 || (_post$_embedded = _post$_embedded['wp:featuredmedia']) === null || _post$_embedded === void 0 || (_post$_embedded = _post$_embedded[0]) === null || _post$_embedded === void 0 ? void 0 : _post$_embedded.id);
    var catNames = post === null || post === void 0 || (_post$_embedded2 = post._embedded) === null || _post$_embedded2 === void 0 || (_post$_embedded2 = _post$_embedded2['wp:term']) === null || _post$_embedded2 === void 0 || (_post$_embedded2 = _post$_embedded2[0]) === null || _post$_embedded2 === void 0 ? void 0 : _post$_embedded2.map(function (t) {
      return t.name;
    }).join(', ');
    var excerpt = trimExcerpt(((_post$excerpt = post.excerpt) === null || _post$excerpt === void 0 ? void 0 : _post$excerpt.rendered) || '');
    return (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("article", {
      key: post.id,
      className: "laca-news-list__item"
    }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
      className: "laca-news-list__thumb"
    }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(PostImage, {
      id: thumbnailId
    })), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
      className: "laca-news-list__content"
    }, showCategory && catNames && (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
      className: "laca-news-list__cat"
    }, catNames), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("h3", {
      className: "laca-news-list__item-title"
    }, ((_post$title = post.title) === null || _post$title === void 0 ? void 0 : _post$title.rendered) || ''), showExcerpt && excerpt && (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("p", {
      className: "laca-news-list__excerpt"
    }, excerpt), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
      className: "laca-news-list__read-more"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Xem thêm', 'lacadev'))));
  })))));
}

/***/ }),

/***/ "./block-gutenberg/news-list-block/index.js":
/*!**************************************************!*\
  !*** ./block-gutenberg/news-list-block/index.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./block.json */ "./block-gutenberg/news-list-block/block.json");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./block-gutenberg/news-list-block/edit.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.scss */ "./block-gutenberg/news-list-block/style.scss");




(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_1__.name, {
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  save: function save() {
    return null;
  }
});

/***/ }),

/***/ "./block-gutenberg/news-list-block/style.scss":
/*!****************************************************!*\
  !*** ./block-gutenberg/news-list-block/style.scss ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ (function(module) {

module.exports = window["React"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ (function(module) {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ (function(module) {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ (function(module) {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/core-data":
/*!**********************************!*\
  !*** external ["wp","coreData"] ***!
  \**********************************/
/***/ (function(module) {

module.exports = window["wp"]["coreData"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ (function(module) {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ (function(module) {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _arrayLikeToArray; }
/* harmony export */ });
function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _arrayWithoutHoles; }
/* harmony export */ });
/* harmony import */ var _arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayLikeToArray.js */ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");

function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(r);
}


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/defineProperty.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _defineProperty; }
/* harmony export */ });
/* harmony import */ var _toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toPropertyKey.js */ "./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js");

function _defineProperty(e, r, t) {
  return (r = (0,_toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__["default"])(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/iterableToArray.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/iterableToArray.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _iterableToArray; }
/* harmony export */ });
function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _nonIterableSpread; }
/* harmony export */ });
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _toConsumableArray; }
/* harmony export */ });
/* harmony import */ var _arrayWithoutHoles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayWithoutHoles.js */ "./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js");
/* harmony import */ var _iterableToArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iterableToArray.js */ "./node_modules/@babel/runtime/helpers/esm/iterableToArray.js");
/* harmony import */ var _unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unsupportedIterableToArray.js */ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js");
/* harmony import */ var _nonIterableSpread_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nonIterableSpread.js */ "./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js");




function _toConsumableArray(r) {
  return (0,_arrayWithoutHoles_js__WEBPACK_IMPORTED_MODULE_0__["default"])(r) || (0,_iterableToArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(r) || (0,_unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(r) || (0,_nonIterableSpread_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
}


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/toPrimitive.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/toPrimitive.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ toPrimitive; }
/* harmony export */ });
/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");

function toPrimitive(t, r) {
  if ("object" != (0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != (0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ toPropertyKey; }
/* harmony export */ });
/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _toPrimitive_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toPrimitive.js */ "./node_modules/@babel/runtime/helpers/esm/toPrimitive.js");


function toPropertyKey(t) {
  var i = (0,_toPrimitive_js__WEBPACK_IMPORTED_MODULE_1__["default"])(t, "string");
  return "symbol" == (0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(i) ? i : i + "";
}


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/typeof.js":
/*!***********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/typeof.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _typeof; }
/* harmony export */ });
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js ***!
  \*******************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _unsupportedIterableToArray; }
/* harmony export */ });
/* harmony import */ var _arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayLikeToArray.js */ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");

function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(r, a) : void 0;
  }
}


/***/ }),

/***/ "./block-gutenberg/news-list-block/block.json":
/*!****************************************************!*\
  !*** ./block-gutenberg/news-list-block/block.json ***!
  \****************************************************/
/***/ (function(module) {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"lacadev/news-list-block","version":"1.0.0","title":"News List Block","category":"lacadev-blocks","icon":"admin-post","description":"Hiển thị danh sách tin tức theo bộ lọc: mới nhất, ngẫu nhiên, xem nhiều nhất; có thể lọc theo danh mục","supports":{"html":false,"anchor":true},"attributes":{"title":{"type":"string","default":"Xu hướng nhà đẹp"},"subtitle":{"type":"string","default":"Tin tức"},"orderBy":{"type":"string","default":"date","enum":["date","rand","comment_count"]},"selectedCats":{"type":"array","items":{"type":"number"},"default":[]},"postsCount":{"type":"number","default":4},"viewAllUrl":{"type":"string","default":""},"viewAllText":{"type":"string","default":"Xem tất cả"},"showExcerpt":{"type":"boolean","default":true},"showCategory":{"type":"boolean","default":true}},"textdomain":"lacadev","render":"file:./render.php"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0,
/******/ 			"./style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunklacadev_theme"] = self["webpackChunklacadev_theme"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-index"], function() { return __webpack_require__("./block-gutenberg/news-list-block/index.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map