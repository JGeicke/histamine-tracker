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
                    <a href="index.html" data-type="index-link">histamin-tracker documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
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
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AboutUsPageModule.html" data-type="entity-link" >AboutUsPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AboutUsPageModule-00c3ca5fc380d15a5e3db5a8db9a6d4208fa7925f0b649df12939db2e5e9ce176db22a639920dee891bd3c91557e56598be4b192e6091e8b9cf342c76c7bf442"' : 'data-target="#xs-components-links-module-AboutUsPageModule-00c3ca5fc380d15a5e3db5a8db9a6d4208fa7925f0b649df12939db2e5e9ce176db22a639920dee891bd3c91557e56598be4b192e6091e8b9cf342c76c7bf442"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AboutUsPageModule-00c3ca5fc380d15a5e3db5a8db9a6d4208fa7925f0b649df12939db2e5e9ce176db22a639920dee891bd3c91557e56598be4b192e6091e8b9cf342c76c7bf442"' :
                                            'id="xs-components-links-module-AboutUsPageModule-00c3ca5fc380d15a5e3db5a8db9a6d4208fa7925f0b649df12939db2e5e9ce176db22a639920dee891bd3c91557e56598be4b192e6091e8b9cf342c76c7bf442"' }>
                                            <li class="link">
                                                <a href="components/AboutUsPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AboutUsPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AboutUsPageRoutingModule.html" data-type="entity-link" >AboutUsPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-f6388ed6fd6ed44a7b65e357718b9114fd26c3b32b58d942c717194654d8ab017727c2ff3a759c1ad269593d8e056cf59c5d91f3af117c03a63af334ce943268"' : 'data-target="#xs-components-links-module-AppModule-f6388ed6fd6ed44a7b65e357718b9114fd26c3b32b58d942c717194654d8ab017727c2ff3a759c1ad269593d8e056cf59c5d91f3af117c03a63af334ce943268"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-f6388ed6fd6ed44a7b65e357718b9114fd26c3b32b58d942c717194654d8ab017727c2ff3a759c1ad269593d8e056cf59c5d91f3af117c03a63af334ce943268"' :
                                            'id="xs-components-links-module-AppModule-f6388ed6fd6ed44a7b65e357718b9114fd26c3b32b58d942c717194654d8ab017727c2ff3a759c1ad269593d8e056cf59c5d91f3af117c03a63af334ce943268"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PrivacyPageModule.html" data-type="entity-link" >PrivacyPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PrivacyPageModule-34b887de97172b454416b16abbe8b458ad0b41186d2e7a52bfe57b4e14a3a0b689fcb10540eb691e2c055cce6d461864f85293501d9cdc2ffc5e9698ebf09583"' : 'data-target="#xs-components-links-module-PrivacyPageModule-34b887de97172b454416b16abbe8b458ad0b41186d2e7a52bfe57b4e14a3a0b689fcb10540eb691e2c055cce6d461864f85293501d9cdc2ffc5e9698ebf09583"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PrivacyPageModule-34b887de97172b454416b16abbe8b458ad0b41186d2e7a52bfe57b4e14a3a0b689fcb10540eb691e2c055cce6d461864f85293501d9cdc2ffc5e9698ebf09583"' :
                                            'id="xs-components-links-module-PrivacyPageModule-34b887de97172b454416b16abbe8b458ad0b41186d2e7a52bfe57b4e14a3a0b689fcb10540eb691e2c055cce6d461864f85293501d9cdc2ffc5e9698ebf09583"' }>
                                            <li class="link">
                                                <a href="components/PrivacyPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrivacyPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PrivacyPageRoutingModule.html" data-type="entity-link" >PrivacyPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ResultPageModule.html" data-type="entity-link" >ResultPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ResultPageModule-c4084caed6c0d278ae898150874f625bb1e23c3c25e97ef2719dd5550bd458d6264aeb619b9ddf8d515210151d0a86e0b5dc9457e3d7d15ad04924d830b670e5"' : 'data-target="#xs-components-links-module-ResultPageModule-c4084caed6c0d278ae898150874f625bb1e23c3c25e97ef2719dd5550bd458d6264aeb619b9ddf8d515210151d0a86e0b5dc9457e3d7d15ad04924d830b670e5"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ResultPageModule-c4084caed6c0d278ae898150874f625bb1e23c3c25e97ef2719dd5550bd458d6264aeb619b9ddf8d515210151d0a86e0b5dc9457e3d7d15ad04924d830b670e5"' :
                                            'id="xs-components-links-module-ResultPageModule-c4084caed6c0d278ae898150874f625bb1e23c3c25e97ef2719dd5550bd458d6264aeb619b9ddf8d515210151d0a86e0b5dc9457e3d7d15ad04924d830b670e5"' }>
                                            <li class="link">
                                                <a href="components/ResultPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResultPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ResultPageRoutingModule.html" data-type="entity-link" >ResultPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ScanPageModule.html" data-type="entity-link" >ScanPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ScanPageModule-28269e1e64916969dfacb0fef8e7b3c079fe1db5796b5513e6731bdfb20e9a426724c383a5825d2f31f98ae4a2624cf423d83ad6d1f2b9b8b51637d5c25d5bc7"' : 'data-target="#xs-components-links-module-ScanPageModule-28269e1e64916969dfacb0fef8e7b3c079fe1db5796b5513e6731bdfb20e9a426724c383a5825d2f31f98ae4a2624cf423d83ad6d1f2b9b8b51637d5c25d5bc7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ScanPageModule-28269e1e64916969dfacb0fef8e7b3c079fe1db5796b5513e6731bdfb20e9a426724c383a5825d2f31f98ae4a2624cf423d83ad6d1f2b9b8b51637d5c25d5bc7"' :
                                            'id="xs-components-links-module-ScanPageModule-28269e1e64916969dfacb0fef8e7b3c079fe1db5796b5513e6731bdfb20e9a426724c383a5825d2f31f98ae4a2624cf423d83ad6d1f2b9b8b51637d5c25d5bc7"' }>
                                            <li class="link">
                                                <a href="components/ScanPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ScanPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ScanPageRoutingModule.html" data-type="entity-link" >ScanPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SettingsPageModule.html" data-type="entity-link" >SettingsPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SettingsPageModule-579268bd6d775e162e1e2f28768deeaf7f4aa8fe51acae8d855596a3157c0fa918581e3eea923a8e8d903ca5c2dfbf4cb5922565f040a48ebf231fd3e2ddf324"' : 'data-target="#xs-components-links-module-SettingsPageModule-579268bd6d775e162e1e2f28768deeaf7f4aa8fe51acae8d855596a3157c0fa918581e3eea923a8e8d903ca5c2dfbf4cb5922565f040a48ebf231fd3e2ddf324"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SettingsPageModule-579268bd6d775e162e1e2f28768deeaf7f4aa8fe51acae8d855596a3157c0fa918581e3eea923a8e8d903ca5c2dfbf4cb5922565f040a48ebf231fd3e2ddf324"' :
                                            'id="xs-components-links-module-SettingsPageModule-579268bd6d775e162e1e2f28768deeaf7f4aa8fe51acae8d855596a3157c0fa918581e3eea923a8e8d903ca5c2dfbf4cb5922565f040a48ebf231fd3e2ddf324"' }>
                                            <li class="link">
                                                <a href="components/SettingsPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SettingsPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SettingsPageRoutingModule.html" data-type="entity-link" >SettingsPageRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AppPage.html" data-type="entity-link" >AppPage</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/LanguageService.html" data-type="entity-link" >LanguageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OpenFoodFactsService.html" data-type="entity-link" >OpenFoodFactsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StorageService.html" data-type="entity-link" >StorageService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});