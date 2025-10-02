/**
 * Base Material Class
 * Tüm malzeme türlerinin miras alacağı temel sınıf
 */

class BaseMaterial {
    constructor(config) {
        this.id = config.id;
        this.names = config.names; // { tr: '...', en: '...' }
        this.density = config.density || 7.85;
        this.types = config.types || null; // Alt tipler varsa
        this.calculateWeight = config.calculateWeight;
        this.getFilterOptions = config.getFilterOptions;
        this.applyFilter = config.applyFilter;
        this.displayFields = config.displayFields || [];
    }

    getName(language = 'tr') {
        return this.names[language] || this.names.tr;
    }

    calculate(dimensions, quantity = 1) {
        if (this.calculateWeight) {
            return this.calculateWeight(dimensions, quantity, this.density);
        }
        throw new Error('Calculate method must be implemented');
    }

    getFilters() {
        if (this.getFilterOptions) {
            return this.getFilterOptions();
        }
        return null;
    }

    filter(selectedValues) {
        if (this.applyFilter) {
            return this.applyFilter(selectedValues);
        }
        return null;
    }

    getDisplayFields() {
        return this.displayFields;
    }

    getTypes() {
        return this.types;
    }

    getInfo() {
        return {
            id: this.id,
            names: this.names,
            density: this.density,
            displayFields: this.displayFields,
            types: this.types
        };
    }
}

window.BaseMaterial = BaseMaterial;
export default BaseMaterial;