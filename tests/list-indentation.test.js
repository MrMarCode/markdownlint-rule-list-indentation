'use strict';

const { expect } = require('chai');

const { markdownlint } = require('markdownlint').promises,
      listIndentation = require('../src/ol-indent');

async function runTest(lines, ruleOptions) {
   const text = lines.join('\n');

   ruleOptions = ruleOptions ? ruleOptions : {
      'start_indent': 2,
      'start_indented': false,
      'indent': 2,
   };

   return markdownlint({
      config: {
         default: false,
         'ol-indent': ruleOptions,
      },
      customRules: [ listIndentation ],
      strings: {
         text,
      },
   });
}

async function testValidExample(lines, ruleOptions) {
   expect((await runTest(lines, ruleOptions)).text).to.eql([]);
}

async function testInvalidExample(expectedErrorCount, lines, ruleOptions) {
   const results = await runTest(lines, ruleOptions),
         message = `Expected ${expectedErrorCount} errors but found ${JSON.stringify(results.text)}`;

   expect(results.text).to.have.length(expectedErrorCount, message);
}

describe('List Indentation', () => {

   it('should validate ol inside of a ul with no starting indentation (4 layers deep)', async () => {
      await testValidExample([
         '* ul item',
         '  * ul item',
         '    1. ol item',
         '       * ul item',
         '    2. ol item',
      ]);
   });

   it('should fail for wrong starting indentation', async () => {
      await testInvalidExample(2, [
         '1. [This is a multiline link',
         '   to test](#test-link)',
         '2. [another link](#another-link)',
      ], { 'start_indent': 2, 'start_indented': true });
   });

   it('should validate list items inside of a blockquote', async () => {
      await testValidExample([
         '    >    > 1. ul item',
         ' >> 2. ul item',
      ]);
   });

   it('should fail short indentation for a blockquote', async () => {
      await testInvalidExample(1, [
         '>> 1. ul item',
         '>>    2. ul item',
      ]);
   });

   it('should fail long indentation for an ol inside of an ul', async () => {
      await testInvalidExample(3, [
         '* ul item',
         '   * ul item',
         '       1. ol item',
         '          * ul item',
         '       2. ol item',
      ]);
   });

   it('should fail short indentation for a sub-list', async () => {
      await testInvalidExample(1, [
         '   1. ol item',
         '     * ul item',
         '   2. ol item',
      ], { 'start_indent': 3, 'start_indented': true });
   });

   it('stars (bold or italics) should not throw off indent check', async () => {
      await testValidExample([
         '## test page',
         '',
         '   1. contact information',
         '      1. contact information',
         '         * contact information',
         '            * Includes body content and a [**Contact Information Chooser**](#TODO) test',
         '               * contact information',
      ], { 'start_indent': 3, 'start_indented': true, 'indent': 3 });
   });

   it('should prioritize indent config setting over dynamic indent for child unordered lists', async () => {
      await testValidExample([
         '   1. ol item',
         '      1. ol item',
         '         * ul item',
         '            * ul item',
         '               * ul item',
      ], { 'start_indent': 3, 'start_indented': true, 'indent': 3 });
   });

   it('should validate ol inside of a ul with starting indentation of 3 (3 layers deep)', async () => {
      await testValidExample([
         '   * ul item',
         '     1. ol item',
         '        * ul item',
         '     2. ol item',
      ], { 'start_indent': 3, 'start_indented': true });
   });

   it('should validate li as a header', async () => {
      await testValidExample([
         '### 1. ol item',
         '   1. ol item',
         '      * ul item',
         '   2. ol item',
         '## 2. ol item',
      ], { 'start_indent': 3, 'start_indented': true });
   });

   it('should validate no lists', async () => {
      await testValidExample([
         '### test',
         'hello this is a random',
         'paragraph',
      ], { 'start_indent': 3, 'start_indented': true });
   });

   it('should validate long ol with wide character markers', async () => {
      await testValidExample([
         '  * ul item',
         '    1. ol item',
         '       * ul item',
         '    2. ol item',
         '    3. ol item',
         '    4. ol item',
         '    5. ol item',
         '    6. ol item',
         '    7. ol item',
         '    8. ol item',
         '    9. ol item',
         '    10. ol item',
         '        * ul item',
         '  * ul item',
         '  * ul item',
         '    1. ol item',
         '    2. ol item',
         '    3. ol item',
         '    4. ol item',
         '    5. ol item',
         '    6. ol item',
         '    7. ol item',
         '    8. ol item',
         '    9. ol item',
         '    10. ol item',
         '    11. ol item',
         '    12. ol item',
         '    13. ol item',
         '    14. ol item',
         '    15. ol item',
         '    16. ol item',
         '    17. ol item',
         '    18. ol item',
         '    19. ol item',
         '    20. ol item',
         '    21. ol item',
         '    22. ol item',
         '    23. ol item',
         '    24. ol item',
         '    25. ol item',
         '    26. ol item',
         '    27. ol item',
         '    28. ol item',
         '    29. ol item',
         '    30. ol item',
         '    31. ol item',
         '    32. ol item',
         '    33. ol item',
         '    34. ol item',
         '    35. ol item',
         '    36. ol item',
         '    37. ol item',
         '    38. ol item',
         '    39. ol item',
         '    40. ol item',
         '    41. ol item',
         '    42. ol item',
         '    43. ol item',
         '    44. ol item',
         '    45. ol item',
         '    46. ol item',
         '    47. ol item',
         '    48. ol item',
         '    49. ol item',
         '    50. ol item',
         '    51. ol item',
         '    52. ol item',
         '    53. ol item',
         '    54. ol item',
         '    55. ol item',
         '    56. ol item',
         '    57. ol item',
         '    58. ol item',
         '    59. ol item',
         '    60. ol item',
         '    61. ol item',
         '    62. ol item',
         '    63. ol item',
         '    64. ol item',
         '    65. ol item',
         '    66. ol item',
         '    67. ol item',
         '    68. ol item',
         '    69. ol item',
         '    70. ol item',
         '    71. ol item',
         '    72. ol item',
         '    73. ol item',
         '    74. ol item',
         '    75. ol item',
         '    76. ol item',
         '    77. ol item',
         '    78. ol item',
         '    79. ol item',
         '    80. ol item',
         '    81. ol item',
         '    82. ol item',
         '    83. ol item',
         '    84. ol item',
         '    85. ol item',
         '    86. ol item',
         '    87. ol item',
         '    88. ol item',
         '    89. ol item',
         '    90. ol item',
         '    91. ol item',
         '    92. ol item',
         '    93. ol item',
         '    94. ol item',
         '    95. ol item',
         '    96. ol item',
         '    97. ol item',
         '    98. ol item',
         '    99. ol item',
         '        * ul item',
         '          1. ol item',
         '             * ul item',
         '    100. ol item',
         '         * ul item',
         '         * ul item',
         '    101. ol item',
         '         * ul item',
      ], { 'start_indent': 2, 'start_indented': true });
   });

});
