export class Version
{
	private ver = [ 0, 0, 0, 0 ];

	constructor( ver: number[] )
	{
		if ( !Array.isArray( ver ) )
		{
			throw new Error( 'Input has to be array' );
		}

		if ( ver.length === 0 || ver.length > 4 )
		{
			throw new Error( `Input array length must be between 1 and 4. Was ${ver.length}` );
		}

		for ( let i = 0; i < Math.min( this.ver.length, ver.length ); ++i )
		{
			if ( typeof ver[i] !== 'number' || Number.isNaN( ver[i] ) )
			{
				throw new Error( 'Value in input array is NaN.' );
			}

			if ( ver[i] < 0 )
			{
				throw new Error( `Value in input array cannot be negative. Was '${ver[i]}'` );
			}

			this.ver[i] = ver[i];
		}
	}

	static parse( ver: string ) : Version
	{
		return new Version(
			ver
				.split( /\./g )
				.map( ( x: string ) => parseInt( x ) )
		);
	}

	major(): number
	{
		return this.ver[ 0 ];
	}

	minor(): number
	{
		return this.ver[ 1 ];
	}

	build(): number
	{
		return this.ver[ 2 ];
	}

	revision(): number
	{
		return this.ver[ 3 ];
	}

	/**
	 * Compares current version instance with another one
	 * 
	 * @param ver Version to compare against
	 * 
	 * @returns Returns 1 when current instance is higher, -1 when lower and 0 when versions are same
	 */
	compare( ver: Version ): number
	{
		for ( let i = 0; i < Math.max( this.ver.length, ver.ver.length ); ++i )
		{
			if ( this.ver[ i ] > ver.ver[ i ] )
			{
				return 1;
			}
			else if ( this.ver[ i ] < ver.ver[ i ] )
			{
				return -1;
			}
		}

		return 0;
	}

	toString( len = 4 ): string
	{
		if ( len < 1 || len > 4 )
		{
			throw new Error( 'length cannot be less than 1 or greater than 4' );
		}

		const ii = Math.min( this.ver.length, len );
		let version = this.ver[ 0 ].toString();
		for ( let i = 1; i < ii; ++i )
		{
			version += `.${this.ver[ i ]}`;
		}

		return version;
	}
}
