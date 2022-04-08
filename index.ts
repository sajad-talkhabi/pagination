// pagination inter face
export type PaginationInterFace = {
    current_page: number;
    from: number;
    last_page: number;
    links: Array<object>;
    path: string;
    per_page: number;
    to: number;
    total: number;
};
// items inter face
export type ItemsInterFace = {
    thumbnail?: string;
    title?: string;
}
// query url api
export type Query = {
    page: number;
    per_page: number;
}
// per page
export type PerPageItem = {
    index: number;
    selected: boolean;
}
const PerPage: Array<PerPageItem> = [
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

class Template {
    pagination?: PaginationInterFace;
    items?: ItemsInterFace[];
    constructor(pagination?: PaginationInterFace, items?: ItemsInterFace[]) {
        this.pagination = pagination;
        this.items = items;
        console.log('sd', this.items, this.pagination);
    }
    async load(url: string) {
        // await (await fetch(`https://app.champya-dev.ir/api/v1/admin/courses${query ? `?${query}` : ''}`, {
        await (await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                'accept-language': 'en'
            },
        })).json().then(({ data, meta }) => {
            this.items = data;
            this.pagination = meta;
        });
        const paginationClass = new Pagination(this.pagination);
        const itemsClass = new Items(this.items);
        paginationClass.makePagination();
        paginationClass.makePerPage()
        itemsClass.makeItems();
    }
}
class Pagination extends Template {
    constructor(pagination?: PaginationInterFace) {
        super(pagination);
    }
    makePagination() {

        let template = document.querySelector('.pagination')!;
        template.innerHTML = ''
        let code = `
        <a value="${this.pagination!.current_page - 1}">&laquo;</a>
        ${this.makePage()}
        <a value="${this.pagination!.current_page + 1}">&raquo;</a>`
        template.insertAdjacentHTML('beforeend', code);
        template.querySelectorAll('.pagination a').forEach(tag => {
            tag.addEventListener('click', (e) => {
                const page = Number((<HTMLElement>e.target).getAttribute('value'));
                if (page > this.pagination!.last_page || page <= 0 || page === this.pagination!.current_page) return;
                this.changePage(page);
            })
        })
    }
    makePage() {
        const loop = (times: number, callback: Function) => {
            return new Array(times).fill(0).map((x, i) => callback(i + 1))
        };
        if (this.pagination!.last_page <= 2) {
            return loop(this.pagination!.last_page, (i: any) => {
                return `<a ${`class="${this.pagination!.current_page === i ? `pagination__item active` : 'pagination__item'}"`} value="${i}">${i}</a>`
            })
        } else {
            return (
                `${loop(2, (i: any) => {
                    return `<a ${`class="${this.pagination!.current_page === i ? `pagination__item active` : 'pagination__item'}"`} value="${i}">${i}</a>`
                })}
                '<span>...</span>'
                ${loop(this.pagination!.last_page - this.pagination!.current_page, (i: any) => {
                    return `<a ${`class="${this.pagination!.current_page === i ? `pagination__item active` : 'pagination__item'}"`} value="${i}">${i}</a>`
                })}`
            )
        }
    }
    changePage(page: any) {
        this.pagination!.current_page = page;
        this.makePagination()
        const Query: Query = {
            page: this.pagination!.current_page,
            per_page: this.pagination!.per_page
        }
        const query = setQuery(Query);
        this.load(`https://app.champya-dev.ir/api/v1/admin/courses?${query}`);
    }
    makePerPage() {
        const template = document.querySelector('.per_page')!;
        template.innerHTML = '';
        // select default value
        let objIndex = PerPage.findIndex(((obj: any) => obj.index == this.pagination!.per_page));
        PerPage[objIndex].selected = true

        let code = `
        <label for="per_page">per page:</label>
        <select name="per_page" id="per_page">
        ${PerPage.map((value: any) => `<option value="${value.index}" ${value.selected && `selected="${value.selected}`}">${value.index}</option>`)}
        </select>`;
        template.insertAdjacentHTML('beforeend', code);

        let select = template.querySelector('select')!;
        select.addEventListener('change', () => {
            this.pagination!.current_page = 1
            this.pagination!.per_page = +select.value;
            const Query: Query = {
                page: this.pagination!.current_page,
                per_page: this.pagination!.per_page
            }
            const query = setQuery(Query);
            this.load(`https://app.champya-dev.ir/api/v1/admin/courses?${query}`);
        });
    }
}
class Items extends Template {
    constructor(items: any) {
        super(undefined, items);
    }
    makeItems() {
        const template = document.querySelector('.items')!;
        template.innerHTML = '';
        this.items!.map((item: ItemsInterFace) => {
            template.insertAdjacentHTML('beforeend', `<div class="card col-3 m-3" style="width:400px">
            <img class="card-img-top" src="${item.thumbnail}" alt="Card image" style="width:100%">
            <div class="card-body">
              <h4 class="card-title">${item.title}</hh4>
            </div>
            </div>`);
        })
    }
}

const setQuery = (obj: object) => {
    let x = '';
    for (const [key, value] of Object.entries(obj)) {
        x += `${key}=${value}`
        x = serialize(x, `${key}=${value}`, '&')
    }
    // remove last word
    var array = x.split('');
    array.splice(-1);  //last item
    x = array.join('')
    return x;
}
const serialize = (originalString: any, matchText: any, addedText: any) => {
    if (originalString.indexOf(matchText) > -1)
        return originalString.slice(0, originalString.indexOf(matchText) + matchText.length)
            + '' + addedText + originalString.slice(originalString.indexOf(matchText) + matchText.length);
    else
        return originalString;
}
let x = new Template();
x.load('https://app.champya-dev.ir/api/v1/admin/courses');