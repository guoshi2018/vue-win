export default 'dd.ts';
export async function funD(): Promise<void> {
	console.log('被bb.ts忽视存在的dd.ts, 无法被前者采用裸路径导入');

	//将构成循环引用
	//const fa = (await import('../a/aa')).funA;
	//fa();
}
