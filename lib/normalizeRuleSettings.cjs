// NOTICE: This file is generated by Rollup. To modify it,
// please instead edit the ESM counterpart and rebuild with Rollup (npm run build).
'use strict';

const validateTypes = require('./utils/validateTypes.cjs');

// Rule settings can take a number of forms, e.g.
// a. "rule-name": null
// b. "rule-name": [null, ...]
// c. "rule-name": primaryOption
// d. "rule-name": [primaryOption]
// e. "rule-name": [primaryOption, secondaryOption]
// Where primaryOption can be anything: primitive, Object, or Array.

/**
 * This function normalizes all the possibilities into the
 * standard form: [primaryOption, secondaryOption]
 * Except in the cases with null, a & b, in which case
 * null is returned
 * @template T
 * @template {object} O
 * @param {import('stylelint').ConfigRuleSettings<T, O>} rawSettings
 * @param {import('stylelint').Rule<T, O>} [rule]
 * @returns {[T] | [T, O] | null}
 */
function normalizeRuleSettings(rawSettings, rule) {
	if (rawSettings === null || rawSettings === undefined) {
		return null;
	}

	if (!Array.isArray(rawSettings)) {
		return [rawSettings];
	}
	// Everything below is an array ...

	const [primary, secondary] = rawSettings;

	if (rawSettings.length > 0 && (primary === null || primary === undefined)) {
		return null;
	}

	if (rule && !rule.primaryOptionArray) {
		return rawSettings;
	}
	// Everything below is a rule that CAN have an array for a primary option ...
	// (they might also have something else, e.g. rule-properties-order can
	// have the string "alphabetical")

	if (rawSettings.length === 1 && Array.isArray(primary)) {
		return rawSettings;
	}

	if (rawSettings.length === 2 && !validateTypes.isPlainObject(primary) && validateTypes.isPlainObject(secondary)) {
		return rawSettings;
	}

	// `T` must be an array type, but TSC thinks it's probably invalid to
	// cast `[T]` to `T` so we cast through `any` first.
	return [/** @type {T} */ (/** @type {any} */ (rawSettings))];
}

module.exports = normalizeRuleSettings;
