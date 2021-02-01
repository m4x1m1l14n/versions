import { Version } from '../src/version';

describe( 'Version Class test', () =>
{
	test( 'parse method', () =>
	{
		expect( () => Version.parse( '    1. 2   .  3 .4   ' ) ).not.toThrow();

		let version = Version.parse( '    1. 2   .  3 .4   ' );
		expect( version.toString() ).toBe( '1.2.3.4' );
		expect( version.major() ).toBe( 1 );
		expect( version.minor() ).toBe( 2 );
		expect( version.build() ).toBe( 3 );
		expect( version.revision() ).toBe( 4 );

		version = Version.parse( '1' );
		expect( version.toString( 1 ) ).toBe( '1' );
		expect( version.toString( 2 ) ).toBe( '1.0' );
		expect( version.toString( 3 ) ).toBe( '1.0.0' );
		expect( version.toString( 4 ) ).toBe( '1.0.0.0' );
		expect( version.toString() ).toBe( '1.0.0.0' );
		expect( version.major() ).toBe( 1 );
		expect( version.minor() ).toBe( 0 );
		expect( version.build() ).toBe( 0 );
		expect( version.revision() ).toBe( 0 );

		version = Version.parse( '10.100.5.6' );
		expect( version.toString( 1 ) ).toBe( '10' );
		expect( version.toString( 2 ) ).toBe( '10.100' );
		expect( version.toString( 3 ) ).toBe( '10.100.5' );
		expect( version.toString( 4 ) ).toBe( '10.100.5.6' );
		expect( version.toString() ).toBe( '10.100.5.6' );
		expect( version.major() ).toBe( 10 );
		expect( version.minor() ).toBe( 100 );
		expect( version.build() ).toBe( 5 );
		expect( version.revision() ).toBe( 6 );

		version = Version.parse( '0.0.0.1' );
		expect( version.toString( 1 ) ).toBe( '0' );
		expect( version.toString( 2 ) ).toBe( '0.0' );
		expect( version.toString( 3 ) ).toBe( '0.0.0' );
		expect( version.toString( 4 ) ).toBe( '0.0.0.1' );
		expect( version.toString() ).toBe( '0.0.0.1' );
		expect( version.major() ).toBe( 0 );
		expect( version.minor() ).toBe( 0 );
		expect( version.build() ).toBe( 0 );
		expect( version.revision() ).toBe( 1 );
	} );

	test( 'compare() method', () =>
	{
		expect( ( new Version( [ 0, 0, 0, 0 ] ).compare( new Version( [ 0, 0, 0, 0 ] ) ) ) ).toBe( 0 );
		expect( ( new Version( [ 1, 5, 3, 4 ] ).compare( new Version( [ 1, 4, 3, 4 ] ) ) ) ).toBe( 1 );
		expect( ( new Version( [ 1, 4, 3, 4 ] ).compare( new Version( [ 1, 5, 3, 4 ] ) ) ) ).toBe( -1 );
		expect( ( new Version( [ 1, 5, 3, 4 ] ).compare( new Version( [ 1, 5, 3, 4 ] ) ) ) ).toBe( 0 );

		expect( ( new Version( [ 1, 0, 0, 1 ] ).compare( new Version( [ 1, 0, 0 ] ) ) ) ).toBe( 1 );
		expect( ( new Version( [ 1, 0, 0 ] ).compare( new Version( [ 1, 0, 0, 1 ] ) ) ) ).toBe( -1 );
		expect( ( new Version( [ 1 ] ).compare( new Version( [ 1, 0, 0 ] ) ) ) ).toBe( 0 );

		expect( ( Version.parse( '0.0.0.0' ).compare( Version.parse( '0.0.0.0' ) ) ) ).toBe( 0 );
	} );

	test( 'test wrong version format', () =>
	{
		expect( () => Version.parse( 'completely wrong input' ) ).toThrow();
		expect( () => Version.parse( '' ) ).toThrow();
		expect( () => Version.parse( 'A.B.C.D' ) ).toThrow();
		expect( () => Version.parse( '1.-2' ) ).toThrow();
		expect( () => Version.parse( '1.-2.3.4' ) ).toThrow();
		expect( () => Version.parse( '.1.2.3' ) ).toThrow();
		expect( () => Version.parse( '1.2.3.' ) ).toThrow();
		expect( () => Version.parse( '1.2.3.A' ) ).toThrow();
		expect( () => Version.parse( '1.2.3.4.5' ) ).toThrow();
		expect( () => Version.parse( '1.2.3.4.5.6.7.8.9.A' ) ).toThrow();
		expect( () => Version.parse( null ) ).toThrow();
		expect( () => Version.parse( undefined ) ).toThrow();
		expect( () => new Version( [] ) ).toThrow();
		expect( () => new Version( [ -1, 2 ] ) ).toThrow();
		expect( () => new Version( [ 1, -2 ] ) ).toThrow();
		expect( () => new Version( [ 1, 2, 3, -4 ] ) ).toThrow();
		expect( () => new Version( [ 1, 2, 3, 4, 5 ] ) ).toThrow();
		expect( () => new Version( [ undefined ] ) ).toThrow();
		expect( () => new Version( [ undefined, undefined, undefined, undefined ] ) ).toThrow();
		expect( () => new Version( [ undefined, undefined, undefined, undefined, undefined ] ) ).toThrow();
		expect( () => new Version( [ null, undefined, undefined, undefined, null ] ) ).toThrow();
		expect( () => new Version( [ null, null, null, null, null ] ) ).toThrow();
		expect( () => new Version( [ 1, null, 2, null, 3, null, 4 ] ) ).toThrow();
		expect( () => new Version( [ 1, undefined, 2, undefined, 3, undefined, 4 ] ) ).toThrow();
		expect( () => new Version( [ 1, 2, 3, 4, null ] ) ).toThrow();
		expect( () => new Version( [ null, 1, 2, 3, 4 ] ) ).toThrow();
		expect( () => new Version( [ null, 1, 2, 3, NaN ] ) ).toThrow();
		expect( () => new Version( [ NaN, 1, 2, 3, 4 ] ) ).toThrow();
		expect( () => new Version( [ 1, 2, 3, 4, NaN ] ) ).toThrow();
	} );

	test( 'input has to be array of numbers', () =>
	{
		expect( () => new Version( 'hello' as any ) ).toThrow();
	} );

	test( 'toString()', () =>
	{
		const version = new Version( [ 1, 2, 3, 4 ] );

		expect( version.toString() ).toBe( '1.2.3.4' );
		expect( version.toString( 1 ) ).toBe( '1' );
		expect( version.toString( 2 ) ).toBe( '1.2' );
		expect( version.toString( 3 ) ).toBe( '1.2.3' );
		expect( version.toString( 4 ) ).toBe( '1.2.3.4' );
		expect( () => version.toString( -1 ) ).toThrow();
		expect( () => version.toString( 0 ) ).toThrow();
		expect( () => version.toString( 5 ) ).toThrow();
	} );
} );
