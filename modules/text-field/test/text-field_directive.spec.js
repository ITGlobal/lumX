describe('text-field directive', function() {
    var $rootScope, $compile, viewElem, viewScope;
    var valueChanged;

    beforeEach(module('lumx.text-field'));
    beforeEach(inject(function(_$rootScope_, _$compile_) {
        $rootScope = _$rootScope_;
        $compile = _$compile_;
    }));

    beforeEach(function() {
        viewScope = $rootScope.$new();
        viewScope.model = { value: 'foobar1' };

        valueChanged = jasmine.createSpy('modelValueChanged');
        viewScope.$watch('model.value', function(x) { valueChanged(x); });

        viewElem = $('<div></div>').appendTo(document.body);
    });
    afterEach(function() {
        viewElem.remove();
    });

    function createWithInput() {
        return $('<lx-text-field label="Label"></lx-text-field>')
            .append('<input type="text" ng-model="model.value">');
    }

    it('should update model value when input element value changes', function() {
        $compile(createWithInput())(viewScope).appendTo(viewElem);
        $rootScope.$digest();
        expect(valueChanged).toHaveBeenCalledWith('foobar1');

        $('input').val('foobar2').triggerHandler('change');

        expect(valueChanged).toHaveBeenCalledWith('foobar2');
    });

    it('should add .text-field--is-focused when input element gets focus', function() {
        $compile(createWithInput())(viewScope).appendTo(viewElem);
        $rootScope.$digest();
        var textField = viewElem.children();
        expect(textField.hasClass('text-field--is-focused')).toBe(false);

        $('input').triggerHandler('focus');

        expect(textField.hasClass('text-field--is-focused')).toBe(true);
    });
});