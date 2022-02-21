import { shallowMount, mount, VueWrapper } from '@vue/test-utils'
import { defineComponent } from 'vue';

//#region global variable
let wrapper: VueWrapper<any>;
let snapIndex: number;
//#endregion

//#region  hook
beforeAll(() => {
	snapIndex = 0;
});
beforeEach(() => {

});
afterEach(async () => {
	//expect(wrapper.html()).toMatchSnapshot('<' + ++snapIndex + '>');
});
//#endregion

//#region component
const AAA = defineComponent({
	template: `
	
	`
});
const BBb = defineComponent({
	template: `
	
	`,
	components: { AAA }
});
//#endregion

//#region testing ...
const couple = [
	{
		desc: '',
		func: () => { },
	}, {
		desc: '',
		func: () => { }
	}, {
		desc: '',
		func: () => { }
	},
];
//#endregion

export default () => {
	for (let i = 0; i < couple.length; i++) {
		test(couple[i].desc, couple[i].func);
	}
};