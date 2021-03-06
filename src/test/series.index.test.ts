import { assert, expect } from 'chai';
import 'mocha';
import { Index } from '../lib/index';
import { Series } from '../lib/series';
import { ArrayIterable } from '../lib/iterables/array-iterable';

describe('Series', () => {

	it('default index is generated', function () {
		var column = new Series([100, 200]);
		expect(column.toPairs()).to.eql([			
			[0, 100],
			[1, 200]			
		]);		
    });
    
    it('can set new index for series from array', () => {
        var series = new Series([10, 20, 30]);
        var newSeries = series.withIndex([11, 22, 33]);
        expect(newSeries.getIndex().toArray()).to.eql([11, 22, 33]);
    });

    it('can set new index for series from series', () => {
        var series = new Series([10, 20, 30]);
        var newSeries = series.withIndex(new Series([11, 22, 33]));
        expect(newSeries.getIndex().toArray()).to.eql([11, 22, 33]);
    });

    it('can set new index for series from index', () => {
        var series = new Series([10, 20, 30]);
        var newSeries = series.withIndex(new Index([11, 22, 33]));
        expect(newSeries.getIndex().toArray()).to.eql([11, 22, 33]);
    });

    it('can set new index using selector', () => {
        var series = new Series([10, 20, 30]);
        var newSeries = series.withIndex(value => value * 2);
        expect(newSeries.getIndex().toArray()).to.eql([20, 40, 60]);
    });

    it('can reset index', () => {
        var series = new Series({
            values:  [10, 20, 30],
            index: [11, 22, 33],
        });
        var newSeries = series.resetIndex();
        expect(newSeries.toPairs()).to.eql([[0, 10], [1, 20], [2, 30]]);
    });
});