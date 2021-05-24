const CSSTypes = {
  style: 1,
  import: 3,
  media: 4,
  fontface: 5,
  keyframes: 7
};

type Rule<T> = T[] | undefined;

export interface ExtendedStyleRule extends CSSStyleRule {
  isDeclaredAfter: (selector: string) => boolean;
}

// TODO: add position property to reduce logic in isDeclaredAfter
const getPosition = (styleRule: CSSStyleRule) => {
  const cssRules = styleRule?.parentStyleSheet?.cssRules;
  if (cssRules && styleRule) {
    const cssRulesArr = Array.from(cssRules);
    return cssRulesArr?.indexOf(styleRule);
  } else {
    return null;
  }
};

const getIsDeclaredAfter = (styleRule: CSSStyleRule) => (selector: string) => {
  // Could use some clean up...
  const cssStyleRules = Array.from(
    styleRule.parentStyleSheet?.cssRules || []
  )?.filter(ele => ele.type === CSSTypes.style) as CSSStyleRule[];
  const previousStyleRule = cssStyleRules.find(
    ele => ele?.selectorText === selector
  );
  if (!previousStyleRule) return false;
  const currPosition = Array.from(
    styleRule.parentStyleSheet?.cssRules || []
  ).indexOf(styleRule);
  const prevPosition = Array.from(
    previousStyleRule?.parentStyleSheet?.cssRules || []
  ).indexOf(previousStyleRule);
  return currPosition > prevPosition;
};

class CSSHelp {
  doc: HTMLDocument;
  constructor(doc: HTMLDocument) {
    this.doc = doc;
  }
  getStyleDeclarations(selector: string): CSSStyleDeclaration[] | undefined {
    const styleSheet = this.getStyleSheet();
    const styleRule = this.styleSheetToCssRulesArray(styleSheet)?.filter(
      ele => ele.type === CSSTypes.style
    ) as CSSStyleRule[] | undefined;
    return styleRule
      ?.filter(ele => ele?.selectorText === selector)
      .map(x => x.style);
  }
  getStyleDeclaration(selector: string): CSSStyleDeclaration | undefined {
    const styleSheet = this.getStyleSheet();
    const styleRule = this.styleSheetToCssRulesArray(styleSheet)?.filter(
      ele => ele.type === CSSTypes.style
    ) as CSSStyleRule[] | undefined;
    return styleRule?.find(ele => ele?.selectorText === selector)?.style;
  }
  getStyleRule(selector: string): ExtendedStyleRule | null {
    const styleSheet = this.getStyleSheet();
    const styleRules = this.styleSheetToCssRulesArray(styleSheet)?.filter(
      ele => ele.type === CSSTypes.style
    ) as CSSStyleRule[] | undefined;
    const styleRule = styleRules?.find(ele => ele?.selectorText === selector);
    if (styleRule) {
      return {
        ...styleRule,
        isDeclaredAfter: (selector: string) =>
          getIsDeclaredAfter(styleRule)(selector)
      };
    } else {
      return null;
    }
  }
  getCSSRules(element?: string): Rule<CSSRule> {
    const styleSheet = this.getStyleSheet();
    const cssRules = this.styleSheetToCssRulesArray(styleSheet);
    switch (element) {
      case 'media':
        return cssRules?.filter(
          ele => ele.type === CSSTypes.media
        ) as Rule<CSSMediaRule>;
      case 'fontface':
        return cssRules?.filter(
          ele => ele.type === CSSTypes.fontface
        ) as Rule<CSSFontFaceRule>;
      case 'import':
        return cssRules?.filter(
          ele => ele.type === CSSTypes.import
        ) as Rule<CSSImportRule>;
      case 'keyframes':
        return cssRules?.filter(
          ele => ele.type === CSSTypes.keyframes
        ) as Rule<CSSKeyframesRule>;
      default:
        return cssRules as Rule<CSSRule>;
    }
  }
  isPropertyUsed(property: string): boolean {
    const styleSheet = this.getStyleSheet();
    const cssStyleRules = this.styleSheetToCssRulesArray(styleSheet).filter(
      ele => ele.type === CSSTypes.style
    ) as CSSStyleRule[] | undefined;
    return (
      cssStyleRules?.some(ele => ele.style?.getPropertyValue(property)) ?? false
    );
  }
  getRuleListsWithinMedia(conditionText: string): CSSStyleRule[] {
    const medias = this.getCSSRules('media') as Rule<CSSMediaRule>;
    const cond = medias?.find(x => x.conditionText === conditionText);
    const cssRules = cond?.cssRules;
    return Array.from(cssRules || []) as CSSStyleRule[];
  }
  getStyleSheet(): CSSStyleSheet | null {
    // TODO: Change selector to match exactly 'styles.css'
    const link: HTMLLinkElement | null = this.doc?.querySelector(
      "link[href*='styles']"
    );
    const style: HTMLStyleElement | null = this.doc?.querySelector('style');
    if (link) {
      return link.sheet;
    } else if (style) {
      return style.sheet;
    } else {
      return null;
    }
  }
  styleSheetToCssRulesArray(
    styleSheet: ReturnType<CSSHelp['getStyleSheet']>
  ): CSSRule[] {
    return Array.from(styleSheet?.cssRules || []);
  }
}

export default CSSHelp;

/*
Example usage
const a = console.assert;

const t = new CSSHelp(document);
console.log(t.getStyleSheet());
// You should use the * selector
a(t.getStyleDeclarations("*")?.length === 1);

// You should use the 'border' property to style all elements
a(t.isPropertyUsed("height"));

// You should declare the '.bb1a' style after the `.bb1` style declaration
a(t.getStyleRule(".bb1a")?.isDeclaredAfter(".bb1"));
*/