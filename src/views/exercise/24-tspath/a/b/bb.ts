
import { print } from "@/common/mixins/func";
const debug = false;
export default 'bb.ts';
export async function funB(): Promise<void> {
	print(debug, 'bb.ts采用裸路径导入dd.ts.即使dd.ts位于同目录,也找不到');

	const fd = (await import('dd')).funD;
	fd();
}
