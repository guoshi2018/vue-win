
import { print } from "@/common/mixins/func";
export default 'aa.ts';
const debug = false;

export async function funA(): Promise<void> {
	print(debug, 'aa.ts 采用....');

	//	const fb = (await import('./b/bb/bbb')).funB;
	//	fb();
}

