import { isArray, isFunction, isObject } from "@/utils/common"

// 根据dom节点修改css样式
export function setStyle(element: HTMLElement, style: Record<string, string>): void {
	for (const key in style) {
		element.style[key] = style[key]
	}
}

export function uuid() {
	const s: Array<any> = []
	const hexDigits = "0123456789abcdef"
	for (let i = 0; i < 36; i++) {
		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
	}
	s[14] = "4" // bits 12-15 of the time_hi_and_version field to 0010
	s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
	s[8] = s[13] = s[18] = s[23] = "-"
	const uuid = s.join("")
	return uuid
}

export function randomString(length: number): string {
	const str = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
	let result = ""
	for (let i = length; i > 0; --i) {
		result += str[Math.floor(Math.random() * str.length)]
	}
	return result
}

/**
 * 中划线字符驼峰
 * @param {*} str 要转换的字符串
 * @returns 返回值
 */
export function toHump(str: string): string {
	if (!str) return str
	return str
		.replace(/\-(\w)/g, function (all, letter) {
			return letter.toUpperCase()
		})
		.replace(/(\s|^)[a-z]/g, function (char) {
			return char.toUpperCase()
		})
}

type ObjectOrArray = Array<any> | object
const isObjectOrArray = it => isObject(it) || isArray(it)

export function deepClone(from, hash = new Map()) {
	// if (isFunction(from)) {
	// 	throw "You cannot clone a function"
	// }
	if (!isObjectOrArray(from)) return from
	if (hash.get(from)) return hash.get(from)
	const to: ObjectOrArray = Array.isArray(from) ? [] : {}
	hash.set(from, to)
	for (const key in from) {
		if (Object.prototype.hasOwnProperty.call(from, key)) {
			const element = from[key]
			to[key] = deepClone(element, hash)
		}
	}
	return to
}