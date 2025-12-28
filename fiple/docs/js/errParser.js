import { fiple, pages, fetchArticles } from "./index.js";

const errType = new URLSearchParams(window.location.search).get('article');

switch (errType) {
    case 'missingRootElem':
        fiple.render(
            pages.missingRootElem,
            { component: 'errPage' },
            { err: errType }
        );
        break;

    case 'inlineStyles':
        fiple.render(
            pages.inlineStyles,
            { component: 'article' },
            { err: errType }
        );
        break;

    case 'elemEvents':
        fiple.render(
            pages.elemEvents,
            { component: 'article' },
            { err: errType }
        );
        break;

    case 'addingClassesToElem':
        fiple.render(
            pages.addingClassesToElem,
            { component: 'article' },
            { err: errType }
        );
        break;

    case 'templating':
        fiple.render(
            pages.templating,
            { component: 'article' },
            { err: errType }
        );
        break;

    case 'elemId':
        fiple.render(
            pages.elemId,
            { component: 'article' },
            { err: errType }
        );
        break;

    case 'RtreeEmpty':
        fiple.render(
            pages.RtreeEmpty,
            { component: 'errPage' },
            { err: errType }
        );
        break;


    case null:
        fiple.render(
            pages.docsHome,
            { component: 'docsHome' }
        ).then(fetchArticles());
        break;

    default:
        fiple.render(
            pages.notfound,
            { component: '404' },
            { err: errType }
        );
        break;
}

