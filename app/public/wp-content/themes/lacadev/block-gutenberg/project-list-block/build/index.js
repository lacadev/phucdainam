/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@wordpress/icons/build-module/library/close-small.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/close-small.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const closeSmall = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M12 13.06l3.712 3.713 1.061-1.06L13.061 12l3.712-3.712-1.06-1.06L12 10.938 8.288 7.227l-1.061 1.06L10.939 12l-3.712 3.712 1.06 1.061L12 13.061z"
}));
/* harmony default export */ __webpack_exports__["default"] = (closeSmall);
//# sourceMappingURL=close-small.js.map

/***/ }),

/***/ "./block-gutenberg/project-list-block/edit.js":
/*!****************************************************!*\
  !*** ./block-gutenberg/project-list-block/edit.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Edit; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/close-small.js");




function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }








// ── PostImage component (theo pattern theme-mau) ───────────────────────────────
function PostImage(_ref) {
  var _media$media_details, _media$media_details2;
  var id = _ref.id;
  var media = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_7__.useSelect)(function (select) {
    if (!id || isNaN(parseInt(id))) return null;
    return select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_8__.store).getMedia(id);
  }, [id]);
  if (!media) {
    return (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      className: "laca-project-list__card-img-placeholder"
    });
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("img", {
    src: ((_media$media_details = media.media_details) === null || _media$media_details === void 0 || (_media$media_details = _media$media_details.sizes) === null || _media$media_details === void 0 || (_media$media_details = _media$media_details.medium_large) === null || _media$media_details === void 0 ? void 0 : _media$media_details.source_url) || ((_media$media_details2 = media.media_details) === null || _media$media_details2 === void 0 || (_media$media_details2 = _media$media_details2.sizes) === null || _media$media_details2 === void 0 || (_media$media_details2 = _media$media_details2.medium) === null || _media$media_details2 === void 0 ? void 0 : _media$media_details2.source_url) || media.source_url,
    alt: media.alt_text || ''
  });
}

// ── Main Edit component ────────────────────────────────────────────────────────
function Edit(_ref2) {
  var attributes = _ref2.attributes,
    setAttributes = _ref2.setAttributes;
  var title = attributes.title,
    subtitle = attributes.subtitle,
    displayMode = attributes.displayMode,
    orderBy = attributes.orderBy,
    selectedCats = attributes.selectedCats,
    postsCount = attributes.postsCount,
    manualPostIds = attributes.manualPostIds;
  var _useState = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_9__.useState)(''),
    _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState, 2),
    searchKeyword = _useState2[0],
    setSearchKeyword = _useState2[1];
  var blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__.useBlockProps)({
    className: 'laca-project-list'
  });

  // ── Taxonomy list ──────────────────────────────────────────────────────────
  var categories = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_7__.useSelect)(function (select) {
    return select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_8__.store).getEntityRecords('taxonomy', 'project_cat', {
      per_page: -1,
      hide_empty: false,
      _fields: 'id,name,slug'
    });
  }, []);

  // ── Preview posts trong editor (AUTO mode) — dùng useSelect chuẩn Gutenberg ──
  var _useSelect = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_7__.useSelect)(function (select) {
      if (displayMode !== 'auto') {
        return {
          previewPosts: null,
          isLoadingPosts: false
        };
      }
      var _select = select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_8__.store),
        getEntityRecords = _select.getEntityRecords,
        isResolving = _select.isResolving;
      var query = {
        per_page: postsCount,
        status: 'publish',
        _embed: true
      };
      if (orderBy === 'rand') {
        query.orderby = 'rand';
      } else if (orderBy === 'comment_count') {
        query.orderby = 'comment_count';
        query.order = 'desc';
      } else {
        query.orderby = 'date';
        query.order = 'desc';
      }

      // Filter by category
      if (selectedCats && selectedCats.length > 0) {
        query.project_cat = selectedCats.join(',');
      }
      var records = getEntityRecords('postType', 'project', query);
      var loading = isResolving('getEntityRecords', ['postType', 'project', query]);
      return {
        previewPosts: records || [],
        isLoadingPosts: loading
      };
    }, [displayMode, postsCount, selectedCats, orderBy]),
    previewPosts = _useSelect.previewPosts,
    isLoadingPosts = _useSelect.isLoadingPosts;

  // ── Manual mode: search posts ──────────────────────────────────────────────
  var searchResults = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_7__.useSelect)(function (select) {
    if (displayMode !== 'manual' || !searchKeyword.trim()) {
      return null;
    }
    return select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_8__.store).getEntityRecords('postType', 'project', {
      search: searchKeyword,
      per_page: 8,
      _fields: 'id,title'
    });
  }, [displayMode, searchKeyword]);

  // ── Manual mode: resolve selected posts for display ────────────────────────
  var selectedPosts = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_7__.useSelect)(function (select) {
    if (!manualPostIds.length) {
      return [];
    }
    var results = [];
    manualPostIds.forEach(function (id) {
      var post = select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_8__.store).getEntityRecord('postType', 'project', id, {
        _fields: 'id,title,featured_media',
        _embed: true
      });
      if (post) {
        results.push(post);
      }
    });
    return results;
  }, [manualPostIds]);

  // ── Handlers ───────────────────────────────────────────────────────────────
  var toggleCat = function toggleCat(id, checked) {
    var next = checked ? [].concat((0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(selectedCats), [id]) : selectedCats.filter(function (c) {
      return c !== id;
    });
    setAttributes({
      selectedCats: next
    });
  };
  var addManualPost = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_9__.useCallback)(function (id) {
    if (!manualPostIds.includes(id)) {
      setAttributes({
        manualPostIds: [].concat((0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(manualPostIds), [id])
      });
    }
    setSearchKeyword('');
  }, [manualPostIds]);
  var removeManualPost = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_9__.useCallback)(function (id) {
    setAttributes({
      manualPostIds: manualPostIds.filter(function (p) {
        return p !== id;
      })
    });
  }, [manualPostIds]);

  // ── Styles helpers ─────────────────────────────────────────────────────────
  var hint = {
    fontSize: '11px',
    color: '#757575',
    marginBottom: '8px'
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(react__WEBPACK_IMPORTED_MODULE_3__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Chế độ hiển thị', 'lacadev'),
    initialOpen: true
  }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.RadioControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Cách lấy bài viết', 'lacadev'),
    selected: displayMode,
    options: [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Tự động (theo danh mục)', 'lacadev'),
      value: 'auto'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Thủ công (chọn từng bài)', 'lacadev'),
      value: 'manual'
    }],
    onChange: function onChange(val) {
      return setAttributes({
        displayMode: val
      });
    }
  })), displayMode === 'auto' && (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(react__WEBPACK_IMPORTED_MODULE_3__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Danh mục hiển thị', 'lacadev'),
    initialOpen: true
  }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("p", {
    style: hint
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Không chọn = hiển thị tất cả.', 'lacadev')), !categories ? (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.Spinner, null) : categories.map(function (cat) {
    return (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.CheckboxControl, {
      key: cat.id,
      label: cat.name,
      checked: selectedCats.includes(cat.id),
      onChange: function onChange(checked) {
        return toggleCat(cat.id, checked);
      }
    });
  })), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Sắp xếp & Số lượng', 'lacadev'),
    initialOpen: true
  }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Thứ tự hiển thị', 'lacadev'),
    value: orderBy,
    options: [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Mới nhất', 'lacadev'),
      value: 'date'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Ngẫu nhiên', 'lacadev'),
      value: 'rand'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Xem nhiều nhất', 'lacadev'),
      value: 'comment_count'
    }],
    onChange: function onChange(val) {
      return setAttributes({
        orderBy: val
      });
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Tổng số dự án hiển thị', 'lacadev'),
    value: postsCount,
    onChange: function onChange(val) {
      return setAttributes({
        postsCount: val
      });
    },
    min: 1,
    max: 24
  }))), displayMode === 'manual' && (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Chọn dự án thủ công', 'lacadev'),
    initialOpen: true
  }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("p", {
    style: hint
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Tìm và chọn từng dự án muốn hiển thị.', 'lacadev')), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Tìm dự án', 'lacadev'),
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Nhập tên dự án…', 'lacadev'),
    value: searchKeyword,
    onChange: setSearchKeyword
  }), searchKeyword && (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
    style: {
      marginTop: '4px',
      marginBottom: '12px'
    }
  }, !searchResults ? (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.Spinner, null) : searchResults.length === 0 ? (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("p", {
    style: _objectSpread(_objectSpread({}, hint), {}, {
      margin: 0
    })
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Không tìm thấy kết quả.', 'lacadev')) : searchResults.map(function (post) {
    var _post$title;
    return (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      key: post.id,
      style: {
        padding: '6px 8px',
        borderBottom: '1px solid #eee',
        cursor: manualPostIds.includes(post.id) ? 'default' : 'pointer',
        opacity: manualPostIds.includes(post.id) ? 0.4 : 1
      },
      onClick: function onClick() {
        return !manualPostIds.includes(post.id) && addManualPost(post.id);
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      style: {
        fontSize: '12px'
      }
    }, manualPostIds.includes(post.id) ? '✓ ' : '+ ', ((_post$title = post.title) === null || _post$title === void 0 ? void 0 : _post$title.rendered) || "#".concat(post.id)));
  })), manualPostIds.length > 0 && (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(react__WEBPACK_IMPORTED_MODULE_3__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("p", {
    style: _objectSpread(_objectSpread({}, hint), {}, {
      marginTop: '8px'
    })
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Đã chọn:', 'lacadev')), manualPostIds.map(function (id) {
    var _post$title2;
    var post = selectedPosts.find(function (p) {
      return p.id === id;
    });
    return (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.Flex, {
      key: id,
      align: "center",
      style: {
        marginBottom: '4px'
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.FlexBlock, null, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      style: {
        fontSize: '12px'
      }
    }, post ? ((_post$title2 = post.title) === null || _post$title2 === void 0 ? void 0 : _post$title2.rendered) || "#".concat(id) : "#".concat(id))), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.FlexItem, null, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.Button, {
      icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_10__["default"],
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Xóa', 'lacadev'),
      isSmall: true,
      onClick: function onClick() {
        return removeManualPost(id);
      }
    })));
  })))), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", _objectSpread({}, blockProps), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
    className: "container-fluid"
  }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
    className: "laca-project-list__header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
    className: "laca-project-list__headings"
  }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__.RichText, {
    tagName: "p",
    className: "laca-project-list__subtitle",
    value: subtitle,
    onChange: function onChange(val) {
      return setAttributes({
        subtitle: val
      });
    },
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Sub-tiêu đề…', 'lacadev'),
    allowedFormats: []
  }), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__.RichText, {
    tagName: "h2",
    className: "laca-project-list__title",
    value: title,
    onChange: function onChange(val) {
      return setAttributes({
        title: val
      });
    },
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Tiêu đề…', 'lacadev'),
    allowedFormats: ['core/bold', 'core/italic']
  })), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
    className: "laca-project-list__cats"
  }, categories ? (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(react__WEBPACK_IMPORTED_MODULE_3__.Fragment, null, categories.filter(function (c) {
    return selectedCats.length === 0 ? true : selectedCats.includes(c.id);
  }).map(function (cat) {
    return (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      key: cat.id,
      className: "laca-project-list__cat-btn"
    }, cat.name);
  }), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
    className: "laca-project-list__cat-btn laca-project-list__cat-btn--all"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Xem tất cả', 'lacadev'))) : (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.Spinner, null))), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("hr", {
    className: "laca-project-list__divider"
  }), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
    className: "laca-project-list__grid"
  }, displayMode === 'auto' ? isLoadingPosts || previewPosts === null ? (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
    style: {
      padding: '2rem',
      textAlign: 'center'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.Spinner, null), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("p", {
    style: {
      color: '#999'
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Đang tải dự án…', 'lacadev'))) : previewPosts.length === 0 ? (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("p", {
    style: {
      color: '#999',
      fontStyle: 'italic',
      gridColumn: '1/-1'
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Không tìm thấy dự án nào. Kiểm tra lại danh mục hoặc thêm dự án.', 'lacadev')) : previewPosts.map(function (post) {
    var _post$title3;
    return (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("article", {
      key: post.id,
      className: "laca-project-list__card"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      className: "laca-project-list__card-img"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(PostImage, {
      id: post.featured_media
    })), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      className: "laca-project-list__card-body"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("h3", {
      className: "laca-project-list__card-title",
      dangerouslySetInnerHTML: {
        __html: (_post$title3 = post.title) === null || _post$title3 === void 0 ? void 0 : _post$title3.rendered
      }
    })));
  }) : (/* Manual mode preview */
  manualPostIds.length === 0 ? (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("p", {
    style: {
      color: '#999',
      fontStyle: 'italic',
      gridColumn: '1/-1'
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Chưa chọn dự án nào. Dùng panel bên phải để tìm và thêm dự án.', 'lacadev')) : selectedPosts.map(function (post) {
    var _post$title4;
    return (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("article", {
      key: post.id,
      className: "laca-project-list__card"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      className: "laca-project-list__card-img"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(PostImage, {
      id: post.featured_media
    })), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      className: "laca-project-list__card-body"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("h3", {
      className: "laca-project-list__card-title",
      dangerouslySetInnerHTML: {
        __html: ((_post$title4 = post.title) === null || _post$title4 === void 0 ? void 0 : _post$title4.rendered) || "#".concat(post.id)
      }
    })));
  }))))));
}

/***/ }),

/***/ "./block-gutenberg/project-list-block/index.js":
/*!*****************************************************!*\
  !*** ./block-gutenberg/project-list-block/index.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./block.json */ "./block-gutenberg/project-list-block/block.json");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./block-gutenberg/project-list-block/edit.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.scss */ "./block-gutenberg/project-list-block/style.scss");




(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_1__.name, {
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  save: function save() {
    return null;
  }
});

/***/ }),

/***/ "./block-gutenberg/project-list-block/style.scss":
/*!*******************************************************!*\
  !*** ./block-gutenberg/project-list-block/style.scss ***!
  \*******************************************************/
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

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ (function(module) {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "@wordpress/primitives":
/*!************************************!*\
  !*** external ["wp","primitives"] ***!
  \************************************/
/***/ (function(module) {

module.exports = window["wp"]["primitives"];

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

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _arrayWithHoles; }
/* harmony export */ });
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
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

/***/ "./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _iterableToArrayLimit; }
/* harmony export */ });
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _nonIterableRest; }
/* harmony export */ });
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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

/***/ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _slicedToArray; }
/* harmony export */ });
/* harmony import */ var _arrayWithHoles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayWithHoles.js */ "./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js");
/* harmony import */ var _iterableToArrayLimit_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iterableToArrayLimit.js */ "./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js");
/* harmony import */ var _unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unsupportedIterableToArray.js */ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js");
/* harmony import */ var _nonIterableRest_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nonIterableRest.js */ "./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js");




function _slicedToArray(r, e) {
  return (0,_arrayWithHoles_js__WEBPACK_IMPORTED_MODULE_0__["default"])(r) || (0,_iterableToArrayLimit_js__WEBPACK_IMPORTED_MODULE_1__["default"])(r, e) || (0,_unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(r, e) || (0,_nonIterableRest_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
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

/***/ "./block-gutenberg/project-list-block/block.json":
/*!*******************************************************!*\
  !*** ./block-gutenberg/project-list-block/block.json ***!
  \*******************************************************/
/***/ (function(module) {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"lacadev/project-list-block","version":"1.0.0","title":"Project List Block","category":"lacadev-blocks","icon":"grid-view","description":"Hiển thị danh sách dự án — Tự động (theo danh mục) hoặc Thủ công (chọn từng bài)","supports":{"html":false,"anchor":true},"attributes":{"title":{"type":"string","default":"Thiết kế kiến trúc"},"subtitle":{"type":"string","default":"Dịch vụ"},"displayMode":{"type":"string","default":"auto","enum":["auto","manual"]},"orderBy":{"type":"string","default":"date","enum":["date","rand","comment_count"]},"selectedCats":{"type":"array","items":{"type":"number"},"default":[]},"postsCount":{"type":"number","default":4},"manualPostIds":{"type":"array","items":{"type":"number"},"default":[]}},"textdomain":"lacadev","render":"file:./render.php"}');

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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-index"], function() { return __webpack_require__("./block-gutenberg/project-list-block/index.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map