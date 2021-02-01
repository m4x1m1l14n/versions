# NodeJS Version string helper

## Install

```
npm i @m4x1m1l14n/version
```

## Usage

### Import

```ts
import { Version } from '@m4x1m1l14n/version';
```

### Parsing version string

Version strings can be parsed with static `Version.parse` method.

```ts
import { Version } from '@m4x1m1l14n/version';

const version = Version.parse( '1.2.3.4' );

console.log( `Major: ${version.major()}` );
console.log( `Minor: ${version.minor()}` );
console.log( `Build: ${version.build()}` );
console.log( `Revision: ${version.revision()}` );

```

Expected output:

```
Major: 1
Minor: 2
Build: 3
Revision: 4
```

Versions can be parsed from input strings in following formats:

```ts
Version.parse( '0.0.0.1' );
Version.parse( '1' );
Version.parse( '1.2' );
Version.parse( '1.2.3' );
Version.parse( '1.2.3.4' );
```

### Constructing version object

Version object can be constructed also with array of numbers

```ts
import { Version } from '@m4x1m1l14n/version';

const version = new Version( [ 1, 2, 3, 4 ] );

console.log( `Major: ${version.major()}` );
console.log( `Minor: ${version.minor()}` );
console.log( `Build: ${version.build()}` );
console.log( `Revision: ${version.revision()}` );
```

Expected output:

```
Major: 1
Minor: 2
Build: 3
Revision: 4
```

### toString()

Version can be stringified in length from 1 to 4 version numbers depending on input to `toString` method.

```ts
import { Version } from '@m4x1m1l14n/version';

const version = new Version( [ 1, 2, 3, 4 ] );

console.log( version.toString(1) );
console.log( version.toString(2) );
console.log( version.toString(3) );
console.log( version.toString(4) );
console.log( version.toString() ); // Default length of 4
```

Expected output:

```
1
1.2
1.2.3
1.2.3.4
1.2.3.4
```

### Comparing versions

Versions can be simply compared to each other.
Compare results:
* **-1** Version A is lower than version B
* **0** Versions are equal
* **1** Version A is greater than version B

```ts
import { Version } from '@m4x1m1l14n/version';

const a = Version.parse( '1.2.0.1' );
const b = Version.parse( '1.3' );

console.log( a.compare( b ) );
console.log( b.compare( a ) );
```

Expected output:

```
-1
1
```
