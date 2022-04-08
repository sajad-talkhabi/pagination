"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var PerPage = [
    {
        index: 1,
        selected: false
    },
    {
        index: 15,
        selected: false
    },
    {
        index: 6,
        selected: false
    },
];
var Template = /** @class */ (function () {
    function Template(pagination, items) {
        this.pagination = pagination;
        this.items = items;
        console.log('sd', this.items, this.pagination);
    }
    Template.prototype.load = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var paginationClass, itemsClass;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(url, {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': "Bearer ".concat(localStorage.getItem('access_token')),
                                'accept-language': 'en'
                            }
                        })];
                    case 1: 
                    // await (await fetch(`https://app.champya-dev.ir/api/v1/admin/courses${query ? `?${query}` : ''}`, {
                    return [4 /*yield*/, (_a.sent()).json().then(function (_a) {
                            var data = _a.data, meta = _a.meta;
                            _this.items = data;
                            _this.pagination = meta;
                        })];
                    case 2:
                        // await (await fetch(`https://app.champya-dev.ir/api/v1/admin/courses${query ? `?${query}` : ''}`, {
                        _a.sent();
                        paginationClass = new Pagination(this.pagination);
                        itemsClass = new Items(this.items);
                        paginationClass.makePagination();
                        paginationClass.makePerPage();
                        itemsClass.makeItems();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Template;
}());
var Pagination = /** @class */ (function (_super) {
    __extends(Pagination, _super);
    function Pagination(pagination) {
        return _super.call(this, pagination) || this;
    }
    Pagination.prototype.makePagination = function () {
        var _this = this;
        var loop = function (times, callback) {
            return new Array(times).fill(0).map(function (x, i) { return callback(i + 1); });
        };
        var template = document.querySelector('.pagination');
        template.innerHTML = '';
        var code = "\n        <a value=\"".concat(this.pagination.current_page - 1, "\">&laquo;</a>\n        ").concat(loop(this.pagination.last_page, function (i) {
            return "<a ".concat("class=\"".concat(_this.pagination.current_page === i ? "pagination__item active" : 'pagination__item', "\""), " value=\"").concat(i, "\">").concat(i, "</a>");
        }), "\n        <a value=\"").concat(this.pagination.current_page + 1, "\">&raquo;</a>");
        template.insertAdjacentHTML('beforeend', code);
        template.querySelectorAll('.pagination a').forEach(function (tag) {
            tag.addEventListener('click', function (e) {
                var page = Number(e.target.getAttribute('value'));
                if (page > _this.pagination.last_page || page <= 0 || page === _this.pagination.current_page)
                    return;
                _this.changePage(page);
            });
        });
    };
    Pagination.prototype.changePage = function (page) {
        this.pagination.current_page = page;
        this.makePagination();
        var Query = {
            page: this.pagination.current_page,
            per_page: this.pagination.per_page
        };
        var query = setQuery(Query);
        this.load("https://app.champya-dev.ir/api/v1/admin/courses?".concat(query));
    };
    Pagination.prototype.makePerPage = function () {
        var _this = this;
        var template = document.querySelector('.per_page');
        template.innerHTML = '';
        // select default value
        var objIndex = PerPage.findIndex((function (obj) { return obj.index == _this.pagination.per_page; }));
        PerPage[objIndex].selected = true;
        var code = "\n        <label for=\"per_page\">per page:</label>\n        <select name=\"per_page\" id=\"per_page\">\n        ".concat(PerPage.map(function (value) { return "<option value=\"".concat(value.index, "\" ").concat(value.selected && "selected=\"".concat(value.selected), "\">").concat(value.index, "</option>"); }), "\n        </select>");
        template.insertAdjacentHTML('beforeend', code);
        var select = template.querySelector('select');
        select.addEventListener('change', function () {
            _this.pagination.current_page = 1;
            _this.pagination.per_page = +select.value;
            var Query = {
                page: _this.pagination.current_page,
                per_page: _this.pagination.per_page
            };
            var query = setQuery(Query);
            _this.load("https://app.champya-dev.ir/api/v1/admin/courses?".concat(query));
        });
    };
    return Pagination;
}(Template));
var Items = /** @class */ (function (_super) {
    __extends(Items, _super);
    function Items(items) {
        return _super.call(this, undefined, items) || this;
    }
    Items.prototype.makeItems = function () {
        var template = document.querySelector('.items');
        template.innerHTML = '';
        this.items.map(function (item) {
            template.insertAdjacentHTML('beforeend', "<div class=\"card col-3 m-3\" style=\"width:400px\">\n            <img class=\"card-img-top\" src=\"".concat(item.thumbnail, "\" alt=\"Card image\" style=\"width:100%\">\n            <div class=\"card-body\">\n              <h4 class=\"card-title\">").concat(item.title, "</hh4>\n            </div>\n            </div>"));
        });
    };
    return Items;
}(Template));
var setQuery = function (obj) {
    var x = '';
    for (var _i = 0, _a = Object.entries(obj); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        x += "".concat(key, "=").concat(value);
        x = serialize(x, "".concat(key, "=").concat(value), '&');
    }
    // remove last word
    var array = x.split('');
    array.splice(-1); //last item
    x = array.join('');
    return x;
};
var serialize = function (originalString, matchText, addedText) {
    if (originalString.indexOf(matchText) > -1)
        return originalString.slice(0, originalString.indexOf(matchText) + matchText.length)
            + '' + addedText + originalString.slice(originalString.indexOf(matchText) + matchText.length);
    else
        return originalString;
};
var x = new Template();
x.load('https://app.champya-dev.ir/api/v1/admin/courses');
