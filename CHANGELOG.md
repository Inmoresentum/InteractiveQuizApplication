# [0.2.0](https://github.com/Inmoresentum/InteractiveQuizApplication/compare/v0.1.0...v0.2.0) (2023-07-08)


### Bug Fixes

* added a custom response for AccountRegistration ([678cd09](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/678cd097e9b70e2da02e109e7a5696d2606c6396))
* added custom cursor to the lading page only as it seems to be distracting for pages and workflow. ([d899f3e](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/d899f3ea0414efb8a0c0ca7ed883febb809e5494))
* added custom message for bad credential for authentication endpoint ([0286d0f](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/0286d0fa407b6f760986c9f694620b97b7096203))
* added the logo create by Nuraiya to Footer.jsx as well. ([f6df5d9](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/f6df5d96e6667039a366768511764d4e9f86a7cd))
* also added logo to the responsive mobile view. ([9948f85](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/9948f859601d0ebcf22200e411d35d399fdd5439))
* fixed an issue with the p tag's padding ([83d9caf](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/83d9caf982e0a2b09cd3341dc3f93d9b65fb635a))
* fixed email formatting issue where the anchor tag was left empty ([a4e8d3f](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/a4e8d3f0d51f2087564e9bd7c5fd6afc7de0e42b))
* fixed Question Entity issue with the builder pattern ([bb49707](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/bb49707516c000fdfc13df8c9c90b9e0095fe326))
* fixed some visual glitches and improved css animation performance and added more fields ([bd53c6b](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/bd53c6b587f5504407d3b5bf2f65a8b4c869d35e))
* fixed the error message issue with next-auth :alien: ([8d81239](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/8d81239746fae619b3d2ae98c9b7fe9dc6eda807))
* fixed the issue unable to add meta-data due to client component by adding an layout ([66f2f0c](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/66f2f0ce06c44db6d3d54e7760418c0ce6b6e01e))
* fixed the issue where favicon.ico provided by Nuraiya was not displaying properly. ([bb5f01b](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/bb5f01b01b2fbb1f0d2b94bcd5f05ed7e599db61))
* fixed the issue where next/link was pointing older urls ([ec070c2](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/ec070c2edcac6e624f4f2b123a71cc5a880db364))
* fixed the issue where sample data was not being inserted correctly. ([6425d76](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/6425d76a12535b8b4fa5c18e0ba9547f07600e03))
* fixing email verification flow (backend) ([6673487](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/6673487bc1cdd8c12a086d379cd02ad92ecb99ed))
* got rid global body selector and scoped styles to their own page for now ([434aa90](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/434aa905e3a8f3af17f3c1ac9ab24c03775f2f3b))
* got rid of comment that was causing the issue ([d7cf4f3](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/d7cf4f3889cbab7a8ff69aee7db331ba200166bb))
* moved next-auth from pages directory to new app directory ([e1382e9](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/e1382e946e64924e10ad03f140d462b15130de3f))
* updated AuthenticationResponse so that clients can better understand the state of the api response. ([122677d](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/122677d9055f3838c7d0edacffb2d989cb8f1f6b))


### Features

* added a basic registration form ([b90224a](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/b90224ae907eda7e113438b20384552d20754e4f))
* added a CustomCursor.jsx which creates a nice looking rounded custom cursor for the lading page only. ([b9fe78f](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/b9fe78fec0e4fcf9550965c70120c5fcec77520d))
* added account verification via email [backend] ([b4c3b05](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/b4c3b05b22910437b5e5646c5df152dc20da19ee))
* added cors and necessary configuration in the controller. ([d6ea694](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/d6ea6942c47dc442e716252acea00c74e52cd69a))
* added custom account registration email template which has more styles and looks better overall. ([f1392fa](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/f1392fa1410ad6c74d2a21f45a0f13b15bc9c65e))
* added IP-based filtering ([1d60204](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/1d602049565c740f902f3d5dc4f93496c95b08d4))
* added re-usable custom quiz components ([c9992e5](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/c9992e5c026e967fb850ed4f4149098357d270ff))
* added the logo in the `Navbar.jsx` along with some animation and hover effects. ([ab18194](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/ab1819477ed5eed2a6c76c304d85181979131af0))
* created a very basic attractive looking glassmorphic login form ([ceca240](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/ceca240b02318db29456c18b30c3642cd76b074a))
* migrated to server side authentication ([3331ea3](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/3331ea3ab88774653937cbc6debd11905d4483e0))
* mode the login card draggable using framer motion. ([6057c51](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/6057c51479e4f409a2d19567736701ba71c61011))



# [0.1.0](https://github.com/Inmoresentum/InteractiveQuizApplication/compare/f0da586fcf5ee237d8d3626203dea5c70f86595d...v0.1.0) (2023-07-07)


### Bug Fixes

* added custom permission ([ea04b3e](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/ea04b3ea7a607a1d1eaa87d641305656f7eeab09))
* changed the group id from starter given default to our own. ([d2b075f](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/d2b075f2e246cdc80f06892b176a6bd8d70cf336))
* changed the triggering to tag push ([2fcac0a](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/2fcac0af3878bcbe6698ca320142638364cb1268))
* fixed indentation related issue. ([f0da586](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/f0da586fcf5ee237d8d3626203dea5c70f86595d))
* getting rid of wrong triggering issue ([d8ae3ca](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/d8ae3ca1820746e6967b2b2b1599f4a7c4e2f277))
* **README:** fixed the indentation issue ([4da2c02](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/4da2c02aaea894ee34ea26ad6b11cd8a23befb09))
* updated the triggering actions and manually creating adding tag ([947e49a](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/947e49adfe991bd426bd7e67a8be1994ebca86e3))


### Features

* added custom styles to `Testimonial.jsx` and added wavy sections. ([23b0795](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/23b0795dea3973a550e689a4208f1866352f1101))
* added NextJS frontEnd. ([d3ae39b](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/d3ae39b9ecf59586132fb559ec6f3fdee46ad74e))
* added SEO(search engine optimization). ([b03854c](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/b03854c3ca7a4ff09712a3ae59fe00235600ad1b))
* added special hover effect on the premium section h1. ([fa9bcc9](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/fa9bcc999b4f36cf4eeb014628751dba7744d540))
* Added the ability to add new quizzes. ([60892de](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/60892de80542c245f159ba930bca616f3d61d271))
* added translation effect on the Anchor tag. ([01e1cb9](https://github.com/Inmoresentum/InteractiveQuizApplication/commit/01e1cb9d15ed925e904e1f8f3d54cb554aa22957))



