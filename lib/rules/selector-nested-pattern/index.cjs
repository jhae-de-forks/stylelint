// NOTICE: This file is generated by Rollup. To modify it,
// please instead edit the ESM counterpart and rebuild with Rollup (npm run build).
'use strict';

const validateTypes = require('../../utils/validateTypes.cjs');
const getRuleSelector = require('../../utils/getRuleSelector.cjs');
const getStrippedSelectorSource = require('../../utils/getStrippedSelectorSource.cjs');
const isStandardSyntaxRule = require('../../utils/isStandardSyntaxRule.cjs');
const parseSelector = require('../../utils/parseSelector.cjs');
const report = require('../../utils/report.cjs');
const ruleMessages = require('../../utils/ruleMessages.cjs');
const validateOptions = require('../../utils/validateOptions.cjs');

/** @import { Rule } from 'postcss' */

const ruleName = 'selector-nested-pattern';

const messages = ruleMessages(ruleName, {
	expected: (selector, pattern) => `Expected "${selector}" to match pattern "${pattern}"`,
});

const meta = {
	url: 'https://stylelint.io/user-guide/rules/selector-nested-pattern',
};

/** @type {import('stylelint').CoreRules[ruleName]} */
const rule = (primary, secondaryOptions) => {
	return (root, result) => {
		const validOptions = validateOptions(
			result,
			ruleName,
			{
				actual: primary,
				possible: [validateTypes.isRegExp, validateTypes.isString],
			},
			{
				actual: secondaryOptions,
				possible: {
					splitList: [validateTypes.isBoolean],
				},
				optional: true,
			},
		);

		if (!validOptions) {
			return;
		}

		const normalizedPattern = validateTypes.isString(primary) ? new RegExp(primary) : primary;
		const splitList = secondaryOptions && secondaryOptions.splitList;

		root.walkRules((ruleNode) => {
			if (ruleNode.parent && ruleNode.parent.type !== 'rule') {
				return;
			}

			if (!isStandardSyntaxRule(ruleNode)) {
				return;
			}

			const selectors = getRuleSelector(ruleNode);

			if (splitList) {
				parseSelector(selectors, result, ruleNode)?.each((selector) => {
					const { index, endIndex, selector: selectorStr } = getStrippedSelectorSource(selector);

					check(ruleNode, selectorStr, index, endIndex);
				});
			} else {
				check(ruleNode, selectors, 0, selectors.length);
			}
		});

		/**
		 * @param {Rule} ruleNode
		 * @param {string} selectorStr
		 * @param {number} index
		 * @param {number} endIndex
		 */
		function check(ruleNode, selectorStr, index, endIndex) {
			if (normalizedPattern.test(selectorStr)) return;

			report({
				result,
				ruleName,
				message: messages.expected,
				messageArgs: [selectorStr, primary],
				node: ruleNode,
				index,
				endIndex,
			});
		}
	};
};

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;

module.exports = rule;
