(function(){
    class BlogStyleV1 {
      constructor(settings) {
        this.settings = settings;
        this.topWrapper = document.querySelector('.blog-item-top-wrapper');
        this.blogContentWrapper = document.querySelector('.blog-item-content-wrapper');
        this.sections = document.querySelector('#sections');
        this.build = {
          _encodeForURL: (str) => {
            return str.split(' ').map(part => encodeURIComponent(part)).join('+');
          },
          _toCssClassName: (str) => {
            let cssClass = str.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '');
            if (/^[0-9]/.test(cssClass)) {
                cssClass = '_' + cssClass;
            }
            return cssClass.toLowerCase();
          },
          date: () => {
            return `<div class="date">
              <p>${this.settings.date.prefix}${this.createDate(this.settings.date.content, this.settings.date.format)}</p>
            </div>`
          },
          author: () => {
            return `<div class="author">
              <p>${this.settings.author.prefix}${this.settings.author}</p>
            </div>`
          },
          categories: () => {
            const isLink = this.settings.categories.isLink;
            const href = (cat) => {
                return `href="${this.settings.backToBlog.url}/tag/${this.build._encodeForURL(cat)}"`
            }
            return (`<div class="tags">` + this.settings.categories.prefix + this.settings.categories.items.map(cat => (
                `<${isLink ? 'a' : 'span'} ${isLink ? href(cat) : ''} class="tag" data-tag="${cat}">${cat}</${isLink ? 'a' : 'span'}>`
              )).join(this.settings.categories.delimiter) + `</div>`);
          },
          tags: () => {
            const isLink = this.settings.tags.isLink;
            const href = (tag) => {
                return `href="${this.settings.backToBlog.url}/tag/${this.build._encodeForURL(tag)}"`
            }
            return (`<div class="tags">` + this.settings.tags.prefix + this.settings.tags.items.map(tag => (
                `<${isLink ? 'a' : 'span'} ${isLink ? href(tag) : ''} class="tag" data-tag="${tag}">${tag}</${isLink ? 'a' : 'span'}>`
              )).join(this.settings.tags.delimiter) + `</div>`);
          },
          title: () => {
            return `<div class="title-wrapper">
              <h1>${this.settings.title.content}</h1>
            </div>`
          },
          excerpt: () => {
            return `<div class="excerpt">
              ${this.settings.excerpt.content}
            </div>`
          },
          backToBlog: () => {
            return `<div class="back-to-blog-wrapper">
              <p><a href="${this.settings.backToBlog.url}">
                ${this.settings.backToBlog.content}
              </a></p>
            </div>`
          }
        }
        this.init();
      } 
  
      init() {
        document.body.classList.add('wm-blog-style-1')
        this.buildIntroSection();
        this.buildAboveBlogContent();
        this.watchForEditMode();
        this.setHeader();
        document.body.classList.add('show-blog-item')
      }
  
      buildIntroSection() {
        const setIntroPadding = () => {
          const height = document.querySelector('#header').clientHeight;
          this.wmBannerSection.style.paddingTop = height + 'px'
        }     
        this.wmBannerSection = document.createElement('section');
        this.wmBannerSection.classList.add('page-section', 'blog-intro-section', this.settings.colorTheme);
        const items = [
          { 
            display: this.settings.backToBlog.display == 'banner', 
            content: () => this.build.backToBlog(), 
            order: this.settings.backToBlog.bannerOrder 
          },
          { 
            display: this.settings.date.display == 'banner', 
            content: () => this.build.date(), 
            order: this.settings.date.bannerOrder 
          },
          { 
            display: this.settings.categories.display == 'banner',
            content: () => this.build.categories(),
            order: this.settings.categories.bannerOrder
          },
          { 
            display: this.settings.tags.display == 'banner', 
            content: () => this.build.tags(), 
            order: this.settings.tags.bannerOrder  
          },
          { 
            display: this.settings.title.display == 'banner', 
            content: () => this.build.title(), 
            order: this.settings.title.bannerOrder  
          },
          { 
            display: this.settings.excerpt.display == 'banner', 
            content: () => this.build.excerpt(), 
            order: this.settings.excerpt.bannerOrder  
          },
          { 
            display: this.settings.author.display == 'banner', 
            content: () => this.build.author(), 
            order: this.settings.author.bannerOrder  
          }
        ];
        const image = () => {
            if (this.settings.bannerImage.src == 'thumbnail') {
                return this.settings.bannerImage.assetUrl
            } else if (this.settings.bannerImage.src == 'social') {
                return this.settings.bannerImage.socialUrl
            }
        }
  
        let innerHTML = items
          .filter(item => item.display)
          .sort((a, b) => a.order - b.order)
          .map(item => item.content())
          .join('');
      
        innerHTML = `<div class="section-border">
          <div class="section-background">
            <img style="object-position: ${this.settings.bannerImage.focal}" src="${image()}" />
            <div class="section-background-overlay"></div>
          </div>
        </div>
        <div class="content-wrapper">
          <div class="content">${innerHTML}</div>
        </div>
        </div>`;
  
        this.sections.style.setProperty('--tweak-blog-item-custom-width', this.settings.bannerContentWidth + '%');
      
        this.wmBannerSection.innerHTML = innerHTML;
        this.sections.prepend(this.wmBannerSection);
        setIntroPadding();
        window.addEventListener('resize', () => setIntroPadding());
      }
      buildAboveBlogContent() {
        this.wmAboveBlogContent = document.createElement('div');
        this.wmAboveBlogContent.classList.add('wm-blog-item-top-wrapper', 'above-blog-content');
        const items = [
            { 
              display: this.settings.backToBlog.display == 'belowBanner', 
              content: () => this.build.backToBlog(), 
              order: this.settings.backToBlog.belowBannerOrder 
            },
            { 
              display: this.settings.date.display == 'belowBanner', 
              content: () => this.build.date(), 
              order: this.settings.date.belowBannerOrder 
            },
            { 
              display: this.settings.categories.display == 'belowBanner',
              content: () => this.build.categories(),
              order: this.settings.categories.belowBannerOrder
            },
            { 
              display: this.settings.tags.display == 'belowBanner', 
              content: () => this.build.tags(), 
              order: this.settings.tags.belowBannerOrder  
            },
            { 
              display: this.settings.title.display == 'belowBanner', 
              content: () => this.build.title(), 
              order: this.settings.title.belowBannerOrder  
            },
            { 
              display: this.settings.excerpt.display == 'belowBanner', 
              content: () => this.build.excerpt(), 
              order: this.settings.excerpt.belowBannerOrder  
            },
            { 
              display: this.settings.author.display == 'belowBanner', 
              content: () => this.build.author(), 
              order: this.settings.author.belowBannerOrder  
            }
          ];
  
  
        let innerHTML = items
          .filter(item => item.display)
          .sort((a, b) => a.order - b.order)
          .map(item => item.content())
          .join('');
      
        innerHTML = `<div class="inner-wrapper">${innerHTML}</div>`;
      
        this.wmAboveBlogContent.innerHTML = innerHTML;
        this.blogContentWrapper.insertAdjacentElement('beforebegin', this.wmAboveBlogContent);
      }
  
      watchForEditMode() {
        if (window.top === window.self) return;
        let observer = new MutationObserver(mutations => {
          for (let mutation of mutations) {
            if (mutation.attributeName === 'class' && 
                mutation.target.classList.contains('sqs-edit-mode-active')) {
               this.wmBannerSection.remove();
               this.wmAboveBlogContent.remove();
              break; 
            }
          }
        });
        
        observer.observe(document.body, { attributes: true });
      }
  
      createDate(isoDate, format) {
        const date = new Date(isoDate);
  
        function getDaySuffix(day) {
          if (day > 3 && day < 21) return 'th';
          switch (day % 10) {
              case 1: return 'st';
              case 2: return 'nd';
              case 3: return 'rd';
              default: return 'th';
          }
        }
    
        let options;
        switch (format) {
            case 'short date':    // 12/31/2023
                options = { year: 'numeric', month: '2-digit', day: '2-digit' };
                break;
            case 'long date':     // December 31, 2023
                options = { year: 'numeric', month: 'long', day: 'numeric' };
                break;
            case 'time':          // 11:59 PM
                options = { hour: '2-digit', minute: '2-digit', hour12: true };
                break;
            case 'weekday':       // Sunday
                options = { weekday: 'long' };
                break;
            case 'month year':    // December 2023
                options = { year: 'numeric', month: 'long' };
                break;
            case 'full':          // Sunday, December 31, 2023, 11:59 PM
                options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long', hour: '2-digit', minute: '2-digit', hour12: true };
                break;
            case 'year':          // 2023
                options = { year: 'numeric' };
                break;
            case 'month':         // December
                options = { month: 'long' };
                break;
            case 'day month':     // 31 December
                options = { day: 'numeric', month: 'long' };
                break;
            case 'iso':           // 2023-12-31T23:59:00
                return date.toISOString();
             case 'month day':    // December 31
              options = { month: 'long', day: 'numeric' };
              break;
            case 'long date with suffix':   // December 31st, 2023
            case 'full with suffix':        // Sunday, December 31st, 2023, 11:59 PM
            case 'month day with suffix':   // December 31st
            case 'day month with suffix':   // 31st December
                const day = date.getDate();
                const suffix = getDaySuffix(day);
                if (format === 'long date with suffix') {
                    options = { year: 'numeric', month: 'long', day: 'numeric' };
                    return new Intl.DateTimeFormat('en-US', options).format(date) + suffix;
                }
                if (format === 'full with suffix') {
                    options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long', hour: '2-digit', minute: '2-digit', hour12: true };
                    return new Intl.DateTimeFormat('en-US', options).format(date) + suffix + date.toLocaleTimeString('en-US');
                }
                if (format === 'month day with suffix') {
                    options = { month: 'long', day: 'numeric' };
                    return new Intl.DateTimeFormat('en-US', options).format(date) + suffix;
                }
                if (format === 'day month with suffix') {
                    options = { day: 'numeric', month: 'long' };
                    return day + suffix + ' ' + date.toLocaleString('en-US', { month: 'long' });
                }
                break;
            default:
                return 'Invalid format';
        }
    
        return new Intl.DateTimeFormat('en-US', options).format(date);
      }
  
      createAuthor(format) {
        let html;
        switch (format) {
          case 'name only':    // 12/31/2023
              html = { year: 'numeric', month: '2-digit', day: '2-digit' };
              break;
          case 'name & image':     // December 31, 2023
              options = { year: 'numeric', month: 'long', day: 'numeric' };
              break;
          case 'name if not guest':          // 11:59 PM
              options = { hour: '2-digit', minute: '2-digit', hour12: true };
              break;
          default:
              return 'Invalid format';
        }
        return html;
      }
  
      setHeader() {
        const header = document.querySelector('#header');
        const themes = ['white', 'white-bold', 'light', 'light-bold', 'bright', 'bright-inverse', 'dark', 'dark-bold', 'black', 'black-bold'];
        const newTheme = this.settings.colorTheme;
        const updateTheme = () => {
          themes.forEach(theme => {
              if (header.classList.contains(theme)) {
                  header.classList.remove(theme);
              }
          });
          header.classList.add(newTheme);
          header.setAttribute('data-header-theme', newTheme);
        }
  
        //If Dynamic
        if (header.dataset.headerStyle == 'dynamic') {
          updateTheme()
        }
        
      }
    }
  
    function deepMerge (...objs) {
        function getType (obj) {
            return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
        }
        function mergeObj (clone, obj) {
            for (let [key, value] of Object.entries(obj)) {
                let type = getType(value);
                if (clone[key] !== undefined && getType(clone[key]) === type && ['array', 'object'].includes(type)) {
                    clone[key] = deepMerge(clone[key], value);
                } else {
                    clone[key] = structuredClone(value);
                }
            }
        }
        let clone = structuredClone(objs.shift());
        for (let obj of objs) {
            let type = getType(obj);
            if (getType(clone) !== type) {
                clone = structuredClone(obj);
                continue;
            }
            if (type === 'array') {
                clone = [...clone, ...structuredClone(obj)];
            } else if (type === 'object') {
                mergeObj(clone, obj);
            } else {
                clone = obj;
            }
        }
    
        return clone;
    
    }
    async function initPlugin() {
      const url = window.location.pathname;
      const time = new Date();
      const response = await fetch(url + '?format=json', {cache: 'no-cache'});
      const json = await response.json();
      const item = json.item;
      const collection = json.collection;
      const tweaks = window.Static?.SQUARESPACE_CONTEXT?.tweakJSON;
      if (!item) return;
      const tagStyle = item.tags ? item.tags.includes('blog-style-1') : null;
      const globalStyle = document.querySelector('[data-wm-plugin="custom-blog-post"][data-style="1"]');
      if (!tagStyle && !globalStyle) return;
      if (tagStyle) item.tags = item.tags.filter(item => item !== 'blog-style-1');
      const userSettings = window.wmBlogStyle1Settings ? window.wmBlogStyle1Settings : {};
      const settings = {
        style: '1',
        colorTheme: 'dark-bold',
        bannerContentWidth: tweaks['tweak-blog-item-custom-width'],
        backToBlog: {
          display: 'banner',
          bannerOrder: 1,
          belowBannerOrder: 1,
          content: '← Back to all entries',
          url: collection.fullUrl
        },
        date: {
            display: 'belowBanner',
            format: 'month day with suffix',
            bannerOrder: 2,
            belowBannerOrder: 2,
            prefix: '',
            content: item.addedOn ? item.addedOn : 1,
        },
        title: {
            display: 'banner',
            content: item.title || '',
            bannerOrder: 5,
            belowBannerOrder: 5,
        },
        tags: {
            display: 'none',
            items: item.tags ? item.tags : [],
            delimiter: ', ',
            bannerOrder: 4,
            belowBannerOrder: 4,
            isLink: true,
            prefix: '',
            suffix: ''
        },
        categories: {
            display: 'none',
            items: item.categories ? item.categories : [],
            bannerOrder: 3,
            belowBannerOrder: 3,
            delimiter: ', ',
            isLink: true,
            prefix: '',
            suffix: ''
        },
        excerpt: {
            display: 'none',
            content: item.excerpt || '',
            bannerOrder: 6,
            belowBannerOrder: 6,
        },
        author: {
            display: 'none',
            content: item.author ? item.author.displayName : 'Guest Author',
            format: 'name only',
            prefix: '',
            bannerOrder: 7,
            belowBannerOrder: 7,
        },
        bannerImage: {
            src: 'thumbnail',
            assetUrl: item.assetUrl || '',
            socialUrl: item.seoData ? item.seoData.seoImage?.assetUrl : '',
            focal: item.mediaFocalPoint ? `${item.mediaFocalPoint.x * 100}% ${item.mediaFocalPoint.y * 100}%` : '50% 50%',
        },
        assetUrl: item.assetUrl || '',
        assetFocal: item.mediaFocalPoint ? `${item.mediaFocalPoint.x * 100}% ${item.mediaFocalPoint.y * 100}%` : '50% 50%',
      };
      const mergedSettings = deepMerge({}, settings, userSettings);
      window.wmBlogStyle = new BlogStyleV1(mergedSettings);
    };
    window.setTimeout(() => {
      document.body.classList.add('show-blog-item')
    }, 250);
    initPlugin();
    
    function removeTags() {
      let str = 'blog-style-1';
      let els = document.querySelectorAll('.blog-item-tag-wrapper');
      for (let el of els){
        if (el.innerText = str) el.remove();
      }
    }
    removeTags();
  }())