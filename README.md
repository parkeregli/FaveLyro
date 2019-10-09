# FaveLyro

## Concerns
I am using the genius-api package found here: https://github.com/jahrlin/genius-api
This package has 3 known vulnerabilities according to NPM all involving the lodash package.

Here is the concern:

Versions of lodash before 4.17.12 are vulnerable to Prototype Pollution. The function
defaultsDeep allows a malicious user to modify the prototype of Object via {constructor:
{prototype: {...}}} causing the addition or modification of an existing property
that will exist on all objects.

Remediation
Update to version 4.17.12 or later.

Since this app is not intended to be a live production app, I am not worried about
the vulnerabilities posted above, however would think about either making my own
package to interface with the Genius API. However to save myself some time, I will
continue to use the package.

## Sources
Here are some of the sources I used to research for my solution:

https://www.youtube.com/watch?v=fgTGADljAeg <br>
https://github.com/jahrlin/genius-api <br>
https://www.restapitutorial.com/httpstatuscodes.html <br>
https://mongoosejs.com/docs/schematypes.html <br>
