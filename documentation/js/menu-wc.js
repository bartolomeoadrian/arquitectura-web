'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">pm2 documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/CarsModule.html" data-type="entity-link" >CarsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CarsModule-7feffffd3596936a3fcedc4000ba33db1e62c1d50c8f3eaf3fe7119c13be18de6149042be24726dd52785eb8366f77a526c92e096d60a86a3cff835278194675"' : 'data-bs-target="#xs-controllers-links-module-CarsModule-7feffffd3596936a3fcedc4000ba33db1e62c1d50c8f3eaf3fe7119c13be18de6149042be24726dd52785eb8366f77a526c92e096d60a86a3cff835278194675"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CarsModule-7feffffd3596936a3fcedc4000ba33db1e62c1d50c8f3eaf3fe7119c13be18de6149042be24726dd52785eb8366f77a526c92e096d60a86a3cff835278194675"' :
                                            'id="xs-controllers-links-module-CarsModule-7feffffd3596936a3fcedc4000ba33db1e62c1d50c8f3eaf3fe7119c13be18de6149042be24726dd52785eb8366f77a526c92e096d60a86a3cff835278194675"' }>
                                            <li class="link">
                                                <a href="controllers/CarsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CarsController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MainModule.html" data-type="entity-link" >MainModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ShopsModule.html" data-type="entity-link" >ShopsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ShopsModule-62ac3105495420dcfde51c5978462cadcb79cab455e536514b454e44997f7c338dfde0ed9d55b6e2959541d7e379d90d161093a393918c98b3306cbec371fecc"' : 'data-bs-target="#xs-controllers-links-module-ShopsModule-62ac3105495420dcfde51c5978462cadcb79cab455e536514b454e44997f7c338dfde0ed9d55b6e2959541d7e379d90d161093a393918c98b3306cbec371fecc"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ShopsModule-62ac3105495420dcfde51c5978462cadcb79cab455e536514b454e44997f7c338dfde0ed9d55b6e2959541d7e379d90d161093a393918c98b3306cbec371fecc"' :
                                            'id="xs-controllers-links-module-ShopsModule-62ac3105495420dcfde51c5978462cadcb79cab455e536514b454e44997f7c338dfde0ed9d55b6e2959541d7e379d90d161093a393918c98b3306cbec371fecc"' }>
                                            <li class="link">
                                                <a href="controllers/ShopsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ShopsController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-a5e0c0196f4837327a8651648a82664f93cb953755e1ce822375f38926c079632a3530789eb1a31ca6db60685a3237ef2ad86c94af20a0303770eb533184fd47"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-a5e0c0196f4837327a8651648a82664f93cb953755e1ce822375f38926c079632a3530789eb1a31ca6db60685a3237ef2ad86c94af20a0303770eb533184fd47"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-a5e0c0196f4837327a8651648a82664f93cb953755e1ce822375f38926c079632a3530789eb1a31ca6db60685a3237ef2ad86c94af20a0303770eb533184fd47"' :
                                            'id="xs-controllers-links-module-UsersModule-a5e0c0196f4837327a8651648a82664f93cb953755e1ce822375f38926c079632a3530789eb1a31ca6db60685a3237ef2ad86c94af20a0303770eb533184fd47"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/CarsController.html" data-type="entity-link" >CarsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ShopsController.html" data-type="entity-link" >ShopsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AllExceptionsFilter.html" data-type="entity-link" >AllExceptionsFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/CarsDTO.html" data-type="entity-link" >CarsDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/ShopsDTO.html" data-type="entity-link" >ShopsDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UsersDTO.html" data-type="entity-link" >UsersDTO</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});