// Generated from PROV_N.g4 by ANTLR 4.7.1
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.misc.*;
import org.antlr.v4.runtime.tree.*;
import java.util.List;
import java.util.Iterator;
import java.util.ArrayList;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast"})
public class PROV_NParser extends Parser {
	static { RuntimeMetaData.checkVersion("4.7.1", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		T__0=1, T__1=2, T__2=3, T__3=4, T__4=5, T__5=6, T__6=7, T__7=8, T__8=9, 
		T__9=10, T__10=11, T__11=12, T__12=13, T__13=14, T__14=15, T__15=16, T__16=17, 
		T__17=18, T__18=19, T__19=20, T__20=21, T__21=22, T__22=23, T__23=24, 
		T__24=25, T__25=26, T__26=27, T__27=28, T__28=29, DOCUMENT=30, ENDDOCUMENT=31, 
		BUNDLE=32, ENDBUNDLE=33, WS=34, COMMENT=35, LINE_COMMENT=36, IRI_REF=37, 
		LESS=38, GREATER=39, PREFX=40, DOT=41, MINUS=42, QUALIFIED_NAME=43, PN_LOCAL=44, 
		PN_CHARS_OTHERS=45, PN_CHARS_ESC=46, PERCENT=47, HEX=48, STRING_LITERAL=49, 
		INT_LITERAL=50, QUALIFIED_NAME_LITERAL=51, ECHAR=52, STRING_LITERAL2=53, 
		STRING_LITERAL_LONG2=54, DATETIME=55, LANGTAG=56;
	public static final int
		RULE_document = 0, RULE_namespaceDeclarations = 1, RULE_defaultNamespaceDeclaration = 2, 
		RULE_namespaceDeclaration = 3, RULE_namespace = 4, RULE_bundle = 5, RULE_identifier = 6, 
		RULE_expression = 7, RULE_entityExpression = 8, RULE_optionalAttributeValuePairs = 9, 
		RULE_attributeValuePairs = 10, RULE_attributeValuePair = 11, RULE_attribute = 12, 
		RULE_literal = 13, RULE_typedLiteral = 14, RULE_datatype = 15, RULE_convenienceNotation = 16, 
		RULE_activityExpression = 17, RULE_timeOrMarker = 18, RULE_time = 19, 
		RULE_generationExpression = 20, RULE_optionalIdentifier = 21, RULE_identifierOrMarker = 22, 
		RULE_eIdentifier = 23, RULE_eIdentifierOrMarker = 24, RULE_aIdentifierOrMarker = 25, 
		RULE_aIdentifier = 26, RULE_agIdentifierOrMarker = 27, RULE_agIdentifier = 28, 
		RULE_cIdentifier = 29, RULE_gIdentifier = 30, RULE_gIdentifierOrMarker = 31, 
		RULE_uIdentifier = 32, RULE_uIdentifierOrMarker = 33, RULE_usageExpression = 34, 
		RULE_startExpression = 35, RULE_endExpression = 36, RULE_invalidationExpression = 37, 
		RULE_communicationExpression = 38, RULE_agentExpression = 39, RULE_associationExpression = 40, 
		RULE_attributionExpression = 41, RULE_delegationExpression = 42, RULE_derivationExpression = 43, 
		RULE_influenceExpression = 44, RULE_alternateExpression = 45, RULE_specializationExpression = 46, 
		RULE_membershipExpression = 47, RULE_extensibilityExpression = 48, RULE_extensibilityArgument = 49, 
		RULE_extensibilityTuple = 50;
	public static final String[] ruleNames = {
		"document", "namespaceDeclarations", "defaultNamespaceDeclaration", "namespaceDeclaration", 
		"namespace", "bundle", "identifier", "expression", "entityExpression", 
		"optionalAttributeValuePairs", "attributeValuePairs", "attributeValuePair", 
		"attribute", "literal", "typedLiteral", "datatype", "convenienceNotation", 
		"activityExpression", "timeOrMarker", "time", "generationExpression", 
		"optionalIdentifier", "identifierOrMarker", "eIdentifier", "eIdentifierOrMarker", 
		"aIdentifierOrMarker", "aIdentifier", "agIdentifierOrMarker", "agIdentifier", 
		"cIdentifier", "gIdentifier", "gIdentifierOrMarker", "uIdentifier", "uIdentifierOrMarker", 
		"usageExpression", "startExpression", "endExpression", "invalidationExpression", 
		"communicationExpression", "agentExpression", "associationExpression", 
		"attributionExpression", "delegationExpression", "derivationExpression", 
		"influenceExpression", "alternateExpression", "specializationExpression", 
		"membershipExpression", "extensibilityExpression", "extensibilityArgument", 
		"extensibilityTuple"
	};

	private static final String[] _LITERAL_NAMES = {
		null, "'default'", "'prefix'", "'entity'", "'('", "')'", "','", "'['", 
		"']'", "'='", "'%%'", "'activity'", "'wasGeneratedBy'", "';'", "'used'", 
		"'wasStartedBy'", "'wasEndedBy'", "'wasInvalidatedBy'", "'wasInformedBy'", 
		"'agent'", "'wasAssociatedWith'", "'wasAttributedTo'", "'actedOnBehalfOf'", 
		"'wasDerivedFrom'", "'wasInfluencedBy'", "'alternateOf'", "'specializationOf'", 
		"'hadMember'", "'{'", "'}'", "'document'", "'endDocument'", "'bundle'", 
		"'endBundle'", null, null, null, null, "'<'", "'>'", null, "'.'", "'-'"
	};
	private static final String[] _SYMBOLIC_NAMES = {
		null, null, null, null, null, null, null, null, null, null, null, null, 
		null, null, null, null, null, null, null, null, null, null, null, null, 
		null, null, null, null, null, null, "DOCUMENT", "ENDDOCUMENT", "BUNDLE", 
		"ENDBUNDLE", "WS", "COMMENT", "LINE_COMMENT", "IRI_REF", "LESS", "GREATER", 
		"PREFX", "DOT", "MINUS", "QUALIFIED_NAME", "PN_LOCAL", "PN_CHARS_OTHERS", 
		"PN_CHARS_ESC", "PERCENT", "HEX", "STRING_LITERAL", "INT_LITERAL", "QUALIFIED_NAME_LITERAL", 
		"ECHAR", "STRING_LITERAL2", "STRING_LITERAL_LONG2", "DATETIME", "LANGTAG"
	};
	public static final Vocabulary VOCABULARY = new VocabularyImpl(_LITERAL_NAMES, _SYMBOLIC_NAMES);

	/**
	 * @deprecated Use {@link #VOCABULARY} instead.
	 */
	@Deprecated
	public static final String[] tokenNames;
	static {
		tokenNames = new String[_SYMBOLIC_NAMES.length];
		for (int i = 0; i < tokenNames.length; i++) {
			tokenNames[i] = VOCABULARY.getLiteralName(i);
			if (tokenNames[i] == null) {
				tokenNames[i] = VOCABULARY.getSymbolicName(i);
			}

			if (tokenNames[i] == null) {
				tokenNames[i] = "<INVALID>";
			}
		}
	}

	@Override
	@Deprecated
	public String[] getTokenNames() {
		return tokenNames;
	}

	@Override

	public Vocabulary getVocabulary() {
		return VOCABULARY;
	}

	@Override
	public String getGrammarFileName() { return "PROV_N.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public ATN getATN() { return _ATN; }

	public PROV_NParser(TokenStream input) {
		super(input);
		_interp = new ParserATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}
	public static class DocumentContext extends ParserRuleContext {
		public TerminalNode DOCUMENT() { return getToken(PROV_NParser.DOCUMENT, 0); }
		public TerminalNode ENDDOCUMENT() { return getToken(PROV_NParser.ENDDOCUMENT, 0); }
		public NamespaceDeclarationsContext namespaceDeclarations() {
			return getRuleContext(NamespaceDeclarationsContext.class,0);
		}
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public List<BundleContext> bundle() {
			return getRuleContexts(BundleContext.class);
		}
		public BundleContext bundle(int i) {
			return getRuleContext(BundleContext.class,i);
		}
		public DocumentContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_document; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).enterDocument(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).exitDocument(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof PROV_NVisitor ) return ((PROV_NVisitor<? extends T>)visitor).visitDocument(this);
			else return visitor.visitChildren(this);
		}
	}

	public final DocumentContext document() throws RecognitionException {
		DocumentContext _localctx = new DocumentContext(_ctx, getState());
		enterRule(_localctx, 0, RULE_document);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(102);
			match(DOCUMENT);
			setState(104);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==T__0 || _la==T__1) {
				{
				setState(103);
				namespaceDeclarations();
				}
			}

			setState(109);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__2) | (1L << T__10) | (1L << T__11) | (1L << T__13) | (1L << T__14) | (1L << T__15) | (1L << T__16) | (1L << T__17) | (1L << T__18) | (1L << T__19) | (1L << T__20) | (1L << T__21) | (1L << T__22) | (1L << T__23) | (1L << T__24) | (1L << T__25) | (1L << T__26) | (1L << QUALIFIED_NAME))) != 0)) {
				{
				{
				setState(106);
				expression();
				}
				}
				setState(111);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(119);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==BUNDLE) {
				{
				setState(112);
				bundle();
				setState(116);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==BUNDLE) {
					{
					{
					setState(113);
					bundle();
					}
					}
					setState(118);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				}
			}

			setState(121);
			match(ENDDOCUMENT);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class NamespaceDeclarationsContext extends ParserRuleContext {
		public DefaultNamespaceDeclarationContext defaultNamespaceDeclaration() {
			return getRuleContext(DefaultNamespaceDeclarationContext.class,0);
		}
		public List<NamespaceDeclarationContext> namespaceDeclaration() {
			return getRuleContexts(NamespaceDeclarationContext.class);
		}
		public NamespaceDeclarationContext namespaceDeclaration(int i) {
			return getRuleContext(NamespaceDeclarationContext.class,i);
		}
		public NamespaceDeclarationsContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_namespaceDeclarations; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).enterNamespaceDeclarations(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).exitNamespaceDeclarations(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof PROV_NVisitor ) return ((PROV_NVisitor<? extends T>)visitor).visitNamespaceDeclarations(this);
			else return visitor.visitChildren(this);
		}
	}

	public final NamespaceDeclarationsContext namespaceDeclarations() throws RecognitionException {
		NamespaceDeclarationsContext _localctx = new NamespaceDeclarationsContext(_ctx, getState());
		enterRule(_localctx, 2, RULE_namespaceDeclarations);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(125);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__0:
				{
				setState(123);
				defaultNamespaceDeclaration();
				}
				break;
			case T__1:
				{
				setState(124);
				namespaceDeclaration();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			setState(130);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==T__1) {
				{
				{
				setState(127);
				namespaceDeclaration();
				}
				}
				setState(132);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class DefaultNamespaceDeclarationContext extends ParserRuleContext {
		public TerminalNode IRI_REF() { return getToken(PROV_NParser.IRI_REF, 0); }
		public DefaultNamespaceDeclarationContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_defaultNamespaceDeclaration; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).enterDefaultNamespaceDeclaration(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).exitDefaultNamespaceDeclaration(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof PROV_NVisitor ) return ((PROV_NVisitor<? extends T>)visitor).visitDefaultNamespaceDeclaration(this);
			else return visitor.visitChildren(this);
		}
	}

	public final DefaultNamespaceDeclarationContext defaultNamespaceDeclaration() throws RecognitionException {
		DefaultNamespaceDeclarationContext _localctx = new DefaultNamespaceDeclarationContext(_ctx, getState());
		enterRule(_localctx, 4, RULE_defaultNamespaceDeclaration);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(133);
			match(T__0);
			setState(134);
			match(IRI_REF);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class NamespaceDeclarationContext extends ParserRuleContext {
		public TerminalNode PREFX() { return getToken(PROV_NParser.PREFX, 0); }
		public NamespaceContext namespace() {
			return getRuleContext(NamespaceContext.class,0);
		}
		public NamespaceDeclarationContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_namespaceDeclaration; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).enterNamespaceDeclaration(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).exitNamespaceDeclaration(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof PROV_NVisitor ) return ((PROV_NVisitor<? extends T>)visitor).visitNamespaceDeclaration(this);
			else return visitor.visitChildren(this);
		}
	}

	public final NamespaceDeclarationContext namespaceDeclaration() throws RecognitionException {
		NamespaceDeclarationContext _localctx = new NamespaceDeclarationContext(_ctx, getState());
		enterRule(_localctx, 6, RULE_namespaceDeclaration);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(136);
			match(T__1);
			setState(137);
			match(PREFX);
			setState(138);
			namespace();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class NamespaceContext extends ParserRuleContext {
		public TerminalNode IRI_REF() { return getToken(PROV_NParser.IRI_REF, 0); }
		public NamespaceContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_namespace; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).enterNamespace(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).exitNamespace(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof PROV_NVisitor ) return ((PROV_NVisitor<? extends T>)visitor).visitNamespace(this);
			else return visitor.visitChildren(this);
		}
	}

	public final NamespaceContext namespace() throws RecognitionException {
		NamespaceContext _localctx = new NamespaceContext(_ctx, getState());
		enterRule(_localctx, 8, RULE_namespace);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(140);
			match(IRI_REF);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class BundleContext extends ParserRuleContext {
		public TerminalNode BUNDLE() { return getToken(PROV_NParser.BUNDLE, 0); }
		public IdentifierContext identifier() {
			return getRuleContext(IdentifierContext.class,0);
		}
		public TerminalNode ENDBUNDLE() { return getToken(PROV_NParser.ENDBUNDLE, 0); }
		public NamespaceDeclarationsContext namespaceDeclarations() {
			return getRuleContext(NamespaceDeclarationsContext.class,0);
		}
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public BundleContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_bundle; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).enterBundle(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).exitBundle(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof PROV_NVisitor ) return ((PROV_NVisitor<? extends T>)visitor).visitBundle(this);
			else return visitor.visitChildren(this);
		}
	}

	public final BundleContext bundle() throws RecognitionException {
		BundleContext _localctx = new BundleContext(_ctx, getState());
		enterRule(_localctx, 10, RULE_bundle);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(142);
			match(BUNDLE);
			setState(143);
			identifier();
			setState(145);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==T__0 || _la==T__1) {
				{
				setState(144);
				namespaceDeclarations();
				}
			}

			setState(150);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__2) | (1L << T__10) | (1L << T__11) | (1L << T__13) | (1L << T__14) | (1L << T__15) | (1L << T__16) | (1L << T__17) | (1L << T__18) | (1L << T__19) | (1L << T__20) | (1L << T__21) | (1L << T__22) | (1L << T__23) | (1L << T__24) | (1L << T__25) | (1L << T__26) | (1L << QUALIFIED_NAME))) != 0)) {
				{
				{
				setState(147);
				expression();
				}
				}
				setState(152);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(153);
			match(ENDBUNDLE);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class IdentifierContext extends ParserRuleContext {
		public TerminalNode QUALIFIED_NAME() { return getToken(PROV_NParser.QUALIFIED_NAME, 0); }
		public IdentifierContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_identifier; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).enterIdentifier(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).exitIdentifier(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof PROV_NVisitor ) return ((PROV_NVisitor<? extends T>)visitor).visitIdentifier(this);
			else return visitor.visitChildren(this);
		}
	}

	public final IdentifierContext identifier() throws RecognitionException {
		IdentifierContext _localctx = new IdentifierContext(_ctx, getState());
		enterRule(_localctx, 12, RULE_identifier);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(155);
			match(QUALIFIED_NAME);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ExpressionContext extends ParserRuleContext {
		public EntityExpressionContext entityExpression() {
			return getRuleContext(EntityExpressionContext.class,0);
		}
		public ActivityExpressionContext activityExpression() {
			return getRuleContext(ActivityExpressionContext.class,0);
		}
		public GenerationExpressionContext generationExpression() {
			return getRuleContext(GenerationExpressionContext.class,0);
		}
		public UsageExpressionContext usageExpression() {
			return getRuleContext(UsageExpressionContext.class,0);
		}
		public StartExpressionContext startExpression() {
			return getRuleContext(StartExpressionContext.class,0);
		}
		public EndExpressionContext endExpression() {
			return getRuleContext(EndExpressionContext.class,0);
		}
		public InvalidationExpressionContext invalidationExpression() {
			return getRuleContext(InvalidationExpressionContext.class,0);
		}
		public CommunicationExpressionContext communicationExpression() {
			return getRuleContext(CommunicationExpressionContext.class,0);
		}
		public AgentExpressionContext agentExpression() {
			return getRuleContext(AgentExpressionContext.class,0);
		}
		public AssociationExpressionContext associationExpression() {
			return getRuleContext(AssociationExpressionContext.class,0);
		}
		public AttributionExpressionContext attributionExpression() {
			return getRuleContext(AttributionExpressionContext.class,0);
		}
		public DelegationExpressionContext delegationExpression() {
			return getRuleContext(DelegationExpressionContext.class,0);
		}
		public DerivationExpressionContext derivationExpression() {
			return getRuleContext(DerivationExpressionContext.class,0);
		}
		public InfluenceExpressionContext influenceExpression() {
			return getRuleContext(InfluenceExpressionContext.class,0);
		}
		public AlternateExpressionContext alternateExpression() {
			return getRuleContext(AlternateExpressionContext.class,0);
		}
		public SpecializationExpressionContext specializationExpression() {
			return getRuleContext(SpecializationExpressionContext.class,0);
		}
		public MembershipExpressionContext membershipExpression() {
			return getRuleContext(MembershipExpressionContext.class,0);
		}
		public ExtensibilityExpressionContext extensibilityExpression() {
			return getRuleContext(ExtensibilityExpressionContext.class,0);
		}
		public ExpressionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_expression; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).enterExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).exitExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof PROV_NVisitor ) return ((PROV_NVisitor<? extends T>)visitor).visitExpression(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ExpressionContext expression() throws RecognitionException {
		ExpressionContext _localctx = new ExpressionContext(_ctx, getState());
		enterRule(_localctx, 14, RULE_expression);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(175);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__2:
				{
				setState(157);
				entityExpression();
				}
				break;
			case T__10:
				{
				setState(158);
				activityExpression();
				}
				break;
			case T__11:
				{
				setState(159);
				generationExpression();
				}
				break;
			case T__13:
				{
				setState(160);
				usageExpression();
				}
				break;
			case T__14:
				{
				setState(161);
				startExpression();
				}
				break;
			case T__15:
				{
				setState(162);
				endExpression();
				}
				break;
			case T__16:
				{
				setState(163);
				invalidationExpression();
				}
				break;
			case T__17:
				{
				setState(164);
				communicationExpression();
				}
				break;
			case T__18:
				{
				setState(165);
				agentExpression();
				}
				break;
			case T__19:
				{
				setState(166);
				associationExpression();
				}
				break;
			case T__20:
				{
				setState(167);
				attributionExpression();
				}
				break;
			case T__21:
				{
				setState(168);
				delegationExpression();
				}
				break;
			case T__22:
				{
				setState(169);
				derivationExpression();
				}
				break;
			case T__23:
				{
				setState(170);
				influenceExpression();
				}
				break;
			case T__24:
				{
				setState(171);
				alternateExpression();
				}
				break;
			case T__25:
				{
				setState(172);
				specializationExpression();
				}
				break;
			case T__26:
				{
				setState(173);
				membershipExpression();
				}
				break;
			case QUALIFIED_NAME:
				{
				setState(174);
				extensibilityExpression();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class EntityExpressionContext extends ParserRuleContext {
		public IdentifierContext identifier() {
			return getRuleContext(IdentifierContext.class,0);
		}
		public OptionalAttributeValuePairsContext optionalAttributeValuePairs() {
			return getRuleContext(OptionalAttributeValuePairsContext.class,0);
		}
		public EntityExpressionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_entityExpression; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).enterEntityExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).exitEntityExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof PROV_NVisitor ) return ((PROV_NVisitor<? extends T>)visitor).visitEntityExpression(this);
			else return visitor.visitChildren(this);
		}
	}

	public final EntityExpressionContext entityExpression() throws RecognitionException {
		EntityExpressionContext _localctx = new EntityExpressionContext(_ctx, getState());
		enterRule(_localctx, 16, RULE_entityExpression);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(177);
			match(T__2);
			setState(178);
			match(T__3);
			setState(179);
			identifier();
			setState(180);
			optionalAttributeValuePairs();
			setState(181);
			match(T__4);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class OptionalAttributeValuePairsContext extends ParserRuleContext {
		public AttributeValuePairsContext attributeValuePairs() {
			return getRuleContext(AttributeValuePairsContext.class,0);
		}
		public OptionalAttributeValuePairsContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_optionalAttributeValuePairs; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).enterOptionalAttributeValuePairs(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).exitOptionalAttributeValuePairs(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof PROV_NVisitor ) return ((PROV_NVisitor<? extends T>)visitor).visitOptionalAttributeValuePairs(this);
			else return visitor.visitChildren(this);
		}
	}

	public final OptionalAttributeValuePairsContext optionalAttributeValuePairs() throws RecognitionException {
		OptionalAttributeValuePairsContext _localctx = new OptionalAttributeValuePairsContext(_ctx, getState());
		enterRule(_localctx, 18, RULE_optionalAttributeValuePairs);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(188);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==T__5) {
				{
				setState(183);
				match(T__5);
				setState(184);
				match(T__6);
				setState(185);
				attributeValuePairs();
				setState(186);
				match(T__7);
				}
			}

			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class AttributeValuePairsContext extends ParserRuleContext {
		public List<AttributeValuePairContext> attributeValuePair() {
			return getRuleContexts(AttributeValuePairContext.class);
		}
		public AttributeValuePairContext attributeValuePair(int i) {
			return getRuleContext(AttributeValuePairContext.class,i);
		}
		public AttributeValuePairsContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_attributeValuePairs; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).enterAttributeValuePairs(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).exitAttributeValuePairs(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof PROV_NVisitor ) return ((PROV_NVisitor<? extends T>)visitor).visitAttributeValuePairs(this);
			else return visitor.visitChildren(this);
		}
	}

	public final AttributeValuePairsContext attributeValuePairs() throws RecognitionException {
		AttributeValuePairsContext _localctx = new AttributeValuePairsContext(_ctx, getState());
		enterRule(_localctx, 20, RULE_attributeValuePairs);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(199);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__7:
				{
				}
				break;
			case QUALIFIED_NAME:
				{
				setState(191);
				attributeValuePair();
				setState(196);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==T__5) {
					{
					{
					setState(192);
					match(T__5);
					setState(193);
					attributeValuePair();
					}
					}
					setState(198);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class AttributeValuePairContext extends ParserRuleContext {
		public AttributeContext attribute() {
			return getRuleContext(AttributeContext.class,0);
		}
		public LiteralContext literal() {
			return getRuleContext(LiteralContext.class,0);
		}
		public AttributeValuePairContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_attributeValuePair; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).enterAttributeValuePair(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).exitAttributeValuePair(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof PROV_NVisitor ) return ((PROV_NVisitor<? extends T>)visitor).visitAttributeValuePair(this);
			else return visitor.visitChildren(this);
		}
	}

	public final AttributeValuePairContext attributeValuePair() throws RecognitionException {
		AttributeValuePairContext _localctx = new AttributeValuePairContext(_ctx, getState());
		enterRule(_localctx, 22, RULE_attributeValuePair);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(201);
			attribute();
			setState(202);
			match(T__8);
			setState(203);
			literal();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class AttributeContext extends ParserRuleContext {
		public TerminalNode QUALIFIED_NAME() { return getToken(PROV_NParser.QUALIFIED_NAME, 0); }
		public AttributeContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_attribute; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).enterAttribute(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).exitAttribute(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof PROV_NVisitor ) return ((PROV_NVisitor<? extends T>)visitor).visitAttribute(this);
			else return visitor.visitChildren(this);
		}
	}

	public final AttributeContext attribute() throws RecognitionException {
		AttributeContext _localctx = new AttributeContext(_ctx, getState());
		enterRule(_localctx, 24, RULE_attribute);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(205);
			match(QUALIFIED_NAME);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class LiteralContext extends ParserRuleContext {
		public TypedLiteralContext typedLiteral() {
			return getRuleContext(TypedLiteralContext.class,0);
		}
		public ConvenienceNotationContext convenienceNotation() {
			return getRuleContext(ConvenienceNotationContext.class,0);
		}
		public LiteralContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_literal; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).enterLiteral(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).exitLiteral(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof PROV_NVisitor ) return ((PROV_NVisitor<? extends T>)visitor).visitLiteral(this);
			else return visitor.visitChildren(this);
		}
	}

	public final LiteralContext literal() throws RecognitionException {
		LiteralContext _localctx = new LiteralContext(_ctx, getState());
		enterRule(_localctx, 26, RULE_literal);
		try {
			setState(209);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,12,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(207);
				typedLiteral();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(208);
				convenienceNotation();
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class TypedLiteralContext extends ParserRuleContext {
		public TerminalNode STRING_LITERAL() { return getToken(PROV_NParser.STRING_LITERAL, 0); }
		public DatatypeContext datatype() {
			return getRuleContext(DatatypeContext.class,0);
		}
		public TypedLiteralContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_typedLiteral; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).enterTypedLiteral(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).exitTypedLiteral(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof PROV_NVisitor ) return ((PROV_NVisitor<? extends T>)visitor).visitTypedLiteral(this);
			else return visitor.visitChildren(this);
		}
	}

	public final TypedLiteralContext typedLiteral() throws RecognitionException {
		TypedLiteralContext _localctx = new TypedLiteralContext(_ctx, getState());
		enterRule(_localctx, 28, RULE_typedLiteral);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(211);
			match(STRING_LITERAL);
			setState(212);
			match(T__9);
			setState(213);
			datatype();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class DatatypeContext extends ParserRuleContext {
		public TerminalNode QUALIFIED_NAME() { return getToken(PROV_NParser.QUALIFIED_NAME, 0); }
		public DatatypeContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_datatype; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).enterDatatype(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).exitDatatype(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof PROV_NVisitor ) return ((PROV_NVisitor<? extends T>)visitor).visitDatatype(this);
			else return visitor.visitChildren(this);
		}
	}

	public final DatatypeContext datatype() throws RecognitionException {
		DatatypeContext _localctx = new DatatypeContext(_ctx, getState());
		enterRule(_localctx, 30, RULE_datatype);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(215);
			match(QUALIFIED_NAME);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ConvenienceNotationContext extends ParserRuleContext {
		public TerminalNode STRING_LITERAL() { return getToken(PROV_NParser.STRING_LITERAL, 0); }
		public TerminalNode LANGTAG() { return getToken(PROV_NParser.LANGTAG, 0); }
		public TerminalNode INT_LITERAL() { return getToken(PROV_NParser.INT_LITERAL, 0); }
		public TerminalNode QUALIFIED_NAME_LITERAL() { return getToken(PROV_NParser.QUALIFIED_NAME_LITERAL, 0); }
		public ConvenienceNotationContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_convenienceNotation; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).enterConvenienceNotation(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).exitConvenienceNotation(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof PROV_NVisitor ) return ((PROV_NVisitor<? extends T>)visitor).visitConvenienceNotation(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ConvenienceNotationContext convenienceNotation() throws RecognitionException {
		ConvenienceNotationContext _localctx = new ConvenienceNotationContext(_ctx, getState());
		enterRule(_localctx, 32, RULE_convenienceNotation);
		int _la;
		try {
			setState(223);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case STRING_LITERAL:
				enterOuterAlt(_localctx, 1);
				{
				setState(217);
				match(STRING_LITERAL);
				setState(219);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==LANGTAG) {
					{
					setState(218);
					match(LANGTAG);
					}
				}

				}
				break;
			case INT_LITERAL:
				enterOuterAlt(_localctx, 2);
				{
				setState(221);
				match(INT_LITERAL);
				}
				break;
			case QUALIFIED_NAME_LITERAL:
				enterOuterAlt(_localctx, 3);
				{
				setState(222);
				match(QUALIFIED_NAME_LITERAL);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ActivityExpressionContext extends ParserRuleContext {
		public IdentifierContext identifier() {
			return getRuleContext(IdentifierContext.class,0);
		}
		public OptionalAttributeValuePairsContext optionalAttributeValuePairs() {
			return getRuleContext(OptionalAttributeValuePairsContext.class,0);
		}
		public List<TimeOrMarkerContext> timeOrMarker() {
			return getRuleContexts(TimeOrMarkerContext.class);
		}
		public TimeOrMarkerContext timeOrMarker(int i) {
			return getRuleContext(TimeOrMarkerContext.class,i);
		}
		public ActivityExpressionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_activityExpression; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).enterActivityExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).exitActivityExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof PROV_NVisitor ) return ((PROV_NVisitor<? extends T>)visitor).visitActivityExpression(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ActivityExpressionContext activityExpression() throws RecognitionException {
		ActivityExpressionContext _localctx = new ActivityExpressionContext(_ctx, getState());
		enterRule(_localctx, 34, RULE_activityExpression);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(225);
			match(T__10);
			setState(226);
			match(T__3);
			setState(227);
			identifier();
			setState(233);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,15,_ctx) ) {
			case 1:
				{
				setState(228);
				match(T__5);
				setState(229);
				timeOrMarker();
				setState(230);
				match(T__5);
				setState(231);
				timeOrMarker();
				}
				break;
			}
			setState(235);
			optionalAttributeValuePairs();
			setState(236);
			match(T__4);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class TimeOrMarkerContext extends ParserRuleContext {
		public TimeContext time() {
			return getRuleContext(TimeContext.class,0);
		}
		public TimeOrMarkerContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_timeOrMarker; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).enterTimeOrMarker(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).exitTimeOrMarker(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof PROV_NVisitor ) return ((PROV_NVisitor<? extends T>)visitor).visitTimeOrMarker(this);
			else return visitor.visitChildren(this);
		}
	}

	public final TimeOrMarkerContext timeOrMarker() throws RecognitionException {
		TimeOrMarkerContext _localctx = new TimeOrMarkerContext(_ctx, getState());
		enterRule(_localctx, 36, RULE_timeOrMarker);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(240);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case DATETIME:
				{
				setState(238);
				time();
				}
				break;
			case MINUS:
				{
				setState(239);
				match(MINUS);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class TimeContext extends ParserRuleContext {
		public TerminalNode DATETIME() { return getToken(PROV_NParser.DATETIME, 0); }
		public TimeContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_time; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).enterTime(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).exitTime(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof PROV_NVisitor ) return ((PROV_NVisitor<? extends T>)visitor).visitTime(this);
			else return visitor.visitChildren(this);
		}
	}

	public final TimeContext time() throws RecognitionException {
		TimeContext _localctx = new TimeContext(_ctx, getState());
		enterRule(_localctx, 38, RULE_time);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(242);
			match(DATETIME);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class GenerationExpressionContext extends ParserRuleContext {
		public OptionalIdentifierContext optionalIdentifier() {
			return getRuleContext(OptionalIdentifierContext.class,0);
		}
		public EIdentifierContext eIdentifier() {
			return getRuleContext(EIdentifierContext.class,0);
		}
		public OptionalAttributeValuePairsContext optionalAttributeValuePairs() {
			return getRuleContext(OptionalAttributeValuePairsContext.class,0);
		}
		public AIdentifierOrMarkerContext aIdentifierOrMarker() {
			return getRuleContext(AIdentifierOrMarkerContext.class,0);
		}
		public TimeOrMarkerContext timeOrMarker() {
			return getRuleContext(TimeOrMarkerContext.class,0);
		}
		public GenerationExpressionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_generationExpression; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).enterGenerationExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).exitGenerationExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof PROV_NVisitor ) return ((PROV_NVisitor<? extends T>)visitor).visitGenerationExpression(this);
			else return visitor.visitChildren(this);
		}
	}

	public final GenerationExpressionContext generationExpression() throws RecognitionException {
		GenerationExpressionContext _localctx = new GenerationExpressionContext(_ctx, getState());
		enterRule(_localctx, 40, RULE_generationExpression);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(244);
			match(T__11);
			setState(245);
			match(T__3);
			setState(246);
			optionalIdentifier();
			setState(247);
			eIdentifier();
			setState(253);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,17,_ctx) ) {
			case 1:
				{
				setState(248);
				match(T__5);
				setState(249);
				aIdentifierOrMarker();
				setState(250);
				match(T__5);
				setState(251);
				timeOrMarker();
				}
				break;
			}
			setState(255);
			optionalAttributeValuePairs();
			setState(256);
			match(T__4);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class OptionalIdentifierContext extends ParserRuleContext {
		public IdentifierOrMarkerContext identifierOrMarker() {
			return getRuleContext(IdentifierOrMarkerContext.class,0);
		}
		public OptionalIdentifierContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_optionalIdentifier; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).enterOptionalIdentifier(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).exitOptionalIdentifier(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof PROV_NVisitor ) return ((PROV_NVisitor<? extends T>)visitor).visitOptionalIdentifier(this);
			else return visitor.visitChildren(this);
		}
	}

	public final OptionalIdentifierContext optionalIdentifier() throws RecognitionException {
		OptionalIdentifierContext _localctx = new OptionalIdentifierContext(_ctx, getState());
		enterRule(_localctx, 42, RULE_optionalIdentifier);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(261);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,18,_ctx) ) {
			case 1:
				{
				setState(258);
				identifierOrMarker();
				setState(259);
				match(T__12);
				}
				break;
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class IdentifierOrMarkerContext extends ParserRuleContext {
		public IdentifierContext identifier() {
			return getRuleContext(IdentifierContext.class,0);
		}
		public IdentifierOrMarkerContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_identifierOrMarker; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).enterIdentifierOrMarker(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).exitIdentifierOrMarker(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof PROV_NVisitor ) return ((PROV_NVisitor<? extends T>)visitor).visitIdentifierOrMarker(this);
			else return visitor.visitChildren(this);
		}
	}

	public final IdentifierOrMarkerContext identifierOrMarker() throws RecognitionException {
		IdentifierOrMarkerContext _localctx = new IdentifierOrMarkerContext(_ctx, getState());
		enterRule(_localctx, 44, RULE_identifierOrMarker);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(265);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case QUALIFIED_NAME:
				{
				setState(263);
				identifier();
				}
				break;
			case MINUS:
				{
				setState(264);
				match(MINUS);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class EIdentifierContext extends ParserRuleContext {
		public IdentifierContext identifier() {
			return getRuleContext(IdentifierContext.class,0);
		}
		public EIdentifierContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_eIdentifier; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).enterEIdentifier(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).exitEIdentifier(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof PROV_NVisitor ) return ((PROV_NVisitor<? extends T>)visitor).visitEIdentifier(this);
			else return visitor.visitChildren(this);
		}
	}

	public final EIdentifierContext eIdentifier() throws RecognitionException {
		EIdentifierContext _localctx = new EIdentifierContext(_ctx, getState());
		enterRule(_localctx, 46, RULE_eIdentifier);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(267);
			identifier();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class EIdentifierOrMarkerContext extends ParserRuleContext {
		public EIdentifierContext eIdentifier() {
			return getRuleContext(EIdentifierContext.class,0);
		}
		public EIdentifierOrMarkerContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_eIdentifierOrMarker; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).enterEIdentifierOrMarker(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).exitEIdentifierOrMarker(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof PROV_NVisitor ) return ((PROV_NVisitor<? extends T>)visitor).visitEIdentifierOrMarker(this);
			else return visitor.visitChildren(this);
		}
	}

	public final EIdentifierOrMarkerContext eIdentifierOrMarker() throws RecognitionException {
		EIdentifierOrMarkerContext _localctx = new EIdentifierOrMarkerContext(_ctx, getState());
		enterRule(_localctx, 48, RULE_eIdentifierOrMarker);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(271);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case QUALIFIED_NAME:
				{
				setState(269);
				eIdentifier();
				}
				break;
			case MINUS:
				{
				setState(270);
				match(MINUS);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class AIdentifierOrMarkerContext extends ParserRuleContext {
		public AIdentifierContext aIdentifier() {
			return getRuleContext(AIdentifierContext.class,0);
		}
		public AIdentifierOrMarkerContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_aIdentifierOrMarker; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).enterAIdentifierOrMarker(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).exitAIdentifierOrMarker(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof PROV_NVisitor ) return ((PROV_NVisitor<? extends T>)visitor).visitAIdentifierOrMarker(this);
			else return visitor.visitChildren(this);
		}
	}

	public final AIdentifierOrMarkerContext aIdentifierOrMarker() throws RecognitionException {
		AIdentifierOrMarkerContext _localctx = new AIdentifierOrMarkerContext(_ctx, getState());
		enterRule(_localctx, 50, RULE_aIdentifierOrMarker);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(275);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case QUALIFIED_NAME:
				{
				setState(273);
				aIdentifier();
				}
				break;
			case MINUS:
				{
				setState(274);
				match(MINUS);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class AIdentifierContext extends ParserRuleContext {
		public IdentifierContext identifier() {
			return getRuleContext(IdentifierContext.class,0);
		}
		public AIdentifierContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_aIdentifier; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).enterAIdentifier(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).exitAIdentifier(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof PROV_NVisitor ) return ((PROV_NVisitor<? extends T>)visitor).visitAIdentifier(this);
			else return visitor.visitChildren(this);
		}
	}

	public final AIdentifierContext aIdentifier() throws RecognitionException {
		AIdentifierContext _localctx = new AIdentifierContext(_ctx, getState());
		enterRule(_localctx, 52, RULE_aIdentifier);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(277);
			identifier();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class AgIdentifierOrMarkerContext extends ParserRuleContext {
		public AgIdentifierContext agIdentifier() {
			return getRuleContext(AgIdentifierContext.class,0);
		}
		public AgIdentifierOrMarkerContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_agIdentifierOrMarker; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).enterAgIdentifierOrMarker(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).exitAgIdentifierOrMarker(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof PROV_NVisitor ) return ((PROV_NVisitor<? extends T>)visitor).visitAgIdentifierOrMarker(this);
			else return visitor.visitChildren(this);
		}
	}

	public final AgIdentifierOrMarkerContext agIdentifierOrMarker() throws RecognitionException {
		AgIdentifierOrMarkerContext _localctx = new AgIdentifierOrMarkerContext(_ctx, getState());
		enterRule(_localctx, 54, RULE_agIdentifierOrMarker);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(281);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case QUALIFIED_NAME:
				{
				setState(279);
				agIdentifier();
				}
				break;
			case MINUS:
				{
				setState(280);
				match(MINUS);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class AgIdentifierContext extends ParserRuleContext {
		public IdentifierContext identifier() {
			return getRuleContext(IdentifierContext.class,0);
		}
		public AgIdentifierContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_agIdentifier; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).enterAgIdentifier(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).exitAgIdentifier(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof PROV_NVisitor ) return ((PROV_NVisitor<? extends T>)visitor).visitAgIdentifier(this);
			else return visitor.visitChildren(this);
		}
	}

	public final AgIdentifierContext agIdentifier() throws RecognitionException {
		AgIdentifierContext _localctx = new AgIdentifierContext(_ctx, getState());
		enterRule(_localctx, 56, RULE_agIdentifier);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(283);
			identifier();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class CIdentifierContext extends ParserRuleContext {
		public IdentifierContext identifier() {
			return getRuleContext(IdentifierContext.class,0);
		}
		public CIdentifierContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_cIdentifier; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).enterCIdentifier(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).exitCIdentifier(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof PROV_NVisitor ) return ((PROV_NVisitor<? extends T>)visitor).visitCIdentifier(this);
			else return visitor.visitChildren(this);
		}
	}

	public final CIdentifierContext cIdentifier() throws RecognitionException {
		CIdentifierContext _localctx = new CIdentifierContext(_ctx, getState());
		enterRule(_localctx, 58, RULE_cIdentifier);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(285);
			identifier();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class GIdentifierContext extends ParserRuleContext {
		public IdentifierContext identifier() {
			return getRuleContext(IdentifierContext.class,0);
		}
		public GIdentifierContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_gIdentifier; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).enterGIdentifier(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).exitGIdentifier(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof PROV_NVisitor ) return ((PROV_NVisitor<? extends T>)visitor).visitGIdentifier(this);
			else return visitor.visitChildren(this);
		}
	}

	public final GIdentifierContext gIdentifier() throws RecognitionException {
		GIdentifierContext _localctx = new GIdentifierContext(_ctx, getState());
		enterRule(_localctx, 60, RULE_gIdentifier);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(287);
			identifier();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class GIdentifierOrMarkerContext extends ParserRuleContext {
		public GIdentifierContext gIdentifier() {
			return getRuleContext(GIdentifierContext.class,0);
		}
		public GIdentifierOrMarkerContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_gIdentifierOrMarker; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).enterGIdentifierOrMarker(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).exitGIdentifierOrMarker(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof PROV_NVisitor ) return ((PROV_NVisitor<? extends T>)visitor).visitGIdentifierOrMarker(this);
			else return visitor.visitChildren(this);
		}
	}

	public final GIdentifierOrMarkerContext gIdentifierOrMarker() throws RecognitionException {
		GIdentifierOrMarkerContext _localctx = new GIdentifierOrMarkerContext(_ctx, getState());
		enterRule(_localctx, 62, RULE_gIdentifierOrMarker);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(291);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case QUALIFIED_NAME:
				{
				setState(289);
				gIdentifier();
				}
				break;
			case MINUS:
				{
				setState(290);
				match(MINUS);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class UIdentifierContext extends ParserRuleContext {
		public IdentifierContext identifier() {
			return getRuleContext(IdentifierContext.class,0);
		}
		public UIdentifierContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_uIdentifier; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).enterUIdentifier(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).exitUIdentifier(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof PROV_NVisitor ) return ((PROV_NVisitor<? extends T>)visitor).visitUIdentifier(this);
			else return visitor.visitChildren(this);
		}
	}

	public final UIdentifierContext uIdentifier() throws RecognitionException {
		UIdentifierContext _localctx = new UIdentifierContext(_ctx, getState());
		enterRule(_localctx, 64, RULE_uIdentifier);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(293);
			identifier();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class UIdentifierOrMarkerContext extends ParserRuleContext {
		public UIdentifierContext uIdentifier() {
			return getRuleContext(UIdentifierContext.class,0);
		}
		public UIdentifierOrMarkerContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_uIdentifierOrMarker; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).enterUIdentifierOrMarker(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).exitUIdentifierOrMarker(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof PROV_NVisitor ) return ((PROV_NVisitor<? extends T>)visitor).visitUIdentifierOrMarker(this);
			else return visitor.visitChildren(this);
		}
	}

	public final UIdentifierOrMarkerContext uIdentifierOrMarker() throws RecognitionException {
		UIdentifierOrMarkerContext _localctx = new UIdentifierOrMarkerContext(_ctx, getState());
		enterRule(_localctx, 66, RULE_uIdentifierOrMarker);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(297);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case QUALIFIED_NAME:
				{
				setState(295);
				uIdentifier();
				}
				break;
			case MINUS:
				{
				setState(296);
				match(MINUS);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class UsageExpressionContext extends ParserRuleContext {
		public OptionalIdentifierContext optionalIdentifier() {
			return getRuleContext(OptionalIdentifierContext.class,0);
		}
		public AIdentifierContext aIdentifier() {
			return getRuleContext(AIdentifierContext.class,0);
		}
		public OptionalAttributeValuePairsContext optionalAttributeValuePairs() {
			return getRuleContext(OptionalAttributeValuePairsContext.class,0);
		}
		public EIdentifierOrMarkerContext eIdentifierOrMarker() {
			return getRuleContext(EIdentifierOrMarkerContext.class,0);
		}
		public TimeOrMarkerContext timeOrMarker() {
			return getRuleContext(TimeOrMarkerContext.class,0);
		}
		public UsageExpressionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_usageExpression; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).enterUsageExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).exitUsageExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof PROV_NVisitor ) return ((PROV_NVisitor<? extends T>)visitor).visitUsageExpression(this);
			else return visitor.visitChildren(this);
		}
	}

	public final UsageExpressionContext usageExpression() throws RecognitionException {
		UsageExpressionContext _localctx = new UsageExpressionContext(_ctx, getState());
		enterRule(_localctx, 68, RULE_usageExpression);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(299);
			match(T__13);
			setState(300);
			match(T__3);
			setState(301);
			optionalIdentifier();
			setState(302);
			aIdentifier();
			setState(308);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,25,_ctx) ) {
			case 1:
				{
				setState(303);
				match(T__5);
				setState(304);
				eIdentifierOrMarker();
				setState(305);
				match(T__5);
				setState(306);
				timeOrMarker();
				}
				break;
			}
			setState(310);
			optionalAttributeValuePairs();
			setState(311);
			match(T__4);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class StartExpressionContext extends ParserRuleContext {
		public OptionalIdentifierContext optionalIdentifier() {
			return getRuleContext(OptionalIdentifierContext.class,0);
		}
		public AIdentifierContext aIdentifier() {
			return getRuleContext(AIdentifierContext.class,0);
		}
		public OptionalAttributeValuePairsContext optionalAttributeValuePairs() {
			return getRuleContext(OptionalAttributeValuePairsContext.class,0);
		}
		public EIdentifierOrMarkerContext eIdentifierOrMarker() {
			return getRuleContext(EIdentifierOrMarkerContext.class,0);
		}
		public AIdentifierOrMarkerContext aIdentifierOrMarker() {
			return getRuleContext(AIdentifierOrMarkerContext.class,0);
		}
		public TimeOrMarkerContext timeOrMarker() {
			return getRuleContext(TimeOrMarkerContext.class,0);
		}
		public StartExpressionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_startExpression; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).enterStartExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).exitStartExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof PROV_NVisitor ) return ((PROV_NVisitor<? extends T>)visitor).visitStartExpression(this);
			else return visitor.visitChildren(this);
		}
	}

	public final StartExpressionContext startExpression() throws RecognitionException {
		StartExpressionContext _localctx = new StartExpressionContext(_ctx, getState());
		enterRule(_localctx, 70, RULE_startExpression);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(313);
			match(T__14);
			setState(314);
			match(T__3);
			setState(315);
			optionalIdentifier();
			setState(316);
			aIdentifier();
			setState(324);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,26,_ctx) ) {
			case 1:
				{
				setState(317);
				match(T__5);
				setState(318);
				eIdentifierOrMarker();
				setState(319);
				match(T__5);
				setState(320);
				aIdentifierOrMarker();
				setState(321);
				match(T__5);
				setState(322);
				timeOrMarker();
				}
				break;
			}
			setState(326);
			optionalAttributeValuePairs();
			setState(327);
			match(T__4);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class EndExpressionContext extends ParserRuleContext {
		public OptionalIdentifierContext optionalIdentifier() {
			return getRuleContext(OptionalIdentifierContext.class,0);
		}
		public AIdentifierContext aIdentifier() {
			return getRuleContext(AIdentifierContext.class,0);
		}
		public OptionalAttributeValuePairsContext optionalAttributeValuePairs() {
			return getRuleContext(OptionalAttributeValuePairsContext.class,0);
		}
		public EIdentifierOrMarkerContext eIdentifierOrMarker() {
			return getRuleContext(EIdentifierOrMarkerContext.class,0);
		}
		public AIdentifierOrMarkerContext aIdentifierOrMarker() {
			return getRuleContext(AIdentifierOrMarkerContext.class,0);
		}
		public TimeOrMarkerContext timeOrMarker() {
			return getRuleContext(TimeOrMarkerContext.class,0);
		}
		public EndExpressionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_endExpression; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).enterEndExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).exitEndExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof PROV_NVisitor ) return ((PROV_NVisitor<? extends T>)visitor).visitEndExpression(this);
			else return visitor.visitChildren(this);
		}
	}

	public final EndExpressionContext endExpression() throws RecognitionException {
		EndExpressionContext _localctx = new EndExpressionContext(_ctx, getState());
		enterRule(_localctx, 72, RULE_endExpression);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(329);
			match(T__15);
			setState(330);
			match(T__3);
			setState(331);
			optionalIdentifier();
			setState(332);
			aIdentifier();
			setState(340);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,27,_ctx) ) {
			case 1:
				{
				setState(333);
				match(T__5);
				setState(334);
				eIdentifierOrMarker();
				setState(335);
				match(T__5);
				setState(336);
				aIdentifierOrMarker();
				setState(337);
				match(T__5);
				setState(338);
				timeOrMarker();
				}
				break;
			}
			setState(342);
			optionalAttributeValuePairs();
			setState(343);
			match(T__4);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class InvalidationExpressionContext extends ParserRuleContext {
		public OptionalIdentifierContext optionalIdentifier() {
			return getRuleContext(OptionalIdentifierContext.class,0);
		}
		public EIdentifierContext eIdentifier() {
			return getRuleContext(EIdentifierContext.class,0);
		}
		public OptionalAttributeValuePairsContext optionalAttributeValuePairs() {
			return getRuleContext(OptionalAttributeValuePairsContext.class,0);
		}
		public AIdentifierOrMarkerContext aIdentifierOrMarker() {
			return getRuleContext(AIdentifierOrMarkerContext.class,0);
		}
		public TimeOrMarkerContext timeOrMarker() {
			return getRuleContext(TimeOrMarkerContext.class,0);
		}
		public InvalidationExpressionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_invalidationExpression; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).enterInvalidationExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).exitInvalidationExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof PROV_NVisitor ) return ((PROV_NVisitor<? extends T>)visitor).visitInvalidationExpression(this);
			else return visitor.visitChildren(this);
		}
	}

	public final InvalidationExpressionContext invalidationExpression() throws RecognitionException {
		InvalidationExpressionContext _localctx = new InvalidationExpressionContext(_ctx, getState());
		enterRule(_localctx, 74, RULE_invalidationExpression);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(345);
			match(T__16);
			setState(346);
			match(T__3);
			setState(347);
			optionalIdentifier();
			setState(348);
			eIdentifier();
			setState(354);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,28,_ctx) ) {
			case 1:
				{
				setState(349);
				match(T__5);
				setState(350);
				aIdentifierOrMarker();
				setState(351);
				match(T__5);
				setState(352);
				timeOrMarker();
				}
				break;
			}
			setState(356);
			optionalAttributeValuePairs();
			setState(357);
			match(T__4);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class CommunicationExpressionContext extends ParserRuleContext {
		public OptionalIdentifierContext optionalIdentifier() {
			return getRuleContext(OptionalIdentifierContext.class,0);
		}
		public List<AIdentifierContext> aIdentifier() {
			return getRuleContexts(AIdentifierContext.class);
		}
		public AIdentifierContext aIdentifier(int i) {
			return getRuleContext(AIdentifierContext.class,i);
		}
		public OptionalAttributeValuePairsContext optionalAttributeValuePairs() {
			return getRuleContext(OptionalAttributeValuePairsContext.class,0);
		}
		public CommunicationExpressionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_communicationExpression; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).enterCommunicationExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).exitCommunicationExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof PROV_NVisitor ) return ((PROV_NVisitor<? extends T>)visitor).visitCommunicationExpression(this);
			else return visitor.visitChildren(this);
		}
	}

	public final CommunicationExpressionContext communicationExpression() throws RecognitionException {
		CommunicationExpressionContext _localctx = new CommunicationExpressionContext(_ctx, getState());
		enterRule(_localctx, 76, RULE_communicationExpression);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(359);
			match(T__17);
			setState(360);
			match(T__3);
			setState(361);
			optionalIdentifier();
			setState(362);
			aIdentifier();
			setState(363);
			match(T__5);
			setState(364);
			aIdentifier();
			setState(365);
			optionalAttributeValuePairs();
			setState(366);
			match(T__4);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class AgentExpressionContext extends ParserRuleContext {
		public IdentifierContext identifier() {
			return getRuleContext(IdentifierContext.class,0);
		}
		public OptionalAttributeValuePairsContext optionalAttributeValuePairs() {
			return getRuleContext(OptionalAttributeValuePairsContext.class,0);
		}
		public AgentExpressionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_agentExpression; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).enterAgentExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).exitAgentExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof PROV_NVisitor ) return ((PROV_NVisitor<? extends T>)visitor).visitAgentExpression(this);
			else return visitor.visitChildren(this);
		}
	}

	public final AgentExpressionContext agentExpression() throws RecognitionException {
		AgentExpressionContext _localctx = new AgentExpressionContext(_ctx, getState());
		enterRule(_localctx, 78, RULE_agentExpression);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(368);
			match(T__18);
			setState(369);
			match(T__3);
			setState(370);
			identifier();
			setState(371);
			optionalAttributeValuePairs();
			setState(372);
			match(T__4);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class AssociationExpressionContext extends ParserRuleContext {
		public OptionalIdentifierContext optionalIdentifier() {
			return getRuleContext(OptionalIdentifierContext.class,0);
		}
		public AIdentifierContext aIdentifier() {
			return getRuleContext(AIdentifierContext.class,0);
		}
		public OptionalAttributeValuePairsContext optionalAttributeValuePairs() {
			return getRuleContext(OptionalAttributeValuePairsContext.class,0);
		}
		public AgIdentifierOrMarkerContext agIdentifierOrMarker() {
			return getRuleContext(AgIdentifierOrMarkerContext.class,0);
		}
		public EIdentifierOrMarkerContext eIdentifierOrMarker() {
			return getRuleContext(EIdentifierOrMarkerContext.class,0);
		}
		public AssociationExpressionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_associationExpression; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).enterAssociationExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).exitAssociationExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof PROV_NVisitor ) return ((PROV_NVisitor<? extends T>)visitor).visitAssociationExpression(this);
			else return visitor.visitChildren(this);
		}
	}

	public final AssociationExpressionContext associationExpression() throws RecognitionException {
		AssociationExpressionContext _localctx = new AssociationExpressionContext(_ctx, getState());
		enterRule(_localctx, 80, RULE_associationExpression);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(374);
			match(T__19);
			setState(375);
			match(T__3);
			setState(376);
			optionalIdentifier();
			setState(377);
			aIdentifier();
			setState(383);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,29,_ctx) ) {
			case 1:
				{
				setState(378);
				match(T__5);
				setState(379);
				agIdentifierOrMarker();
				setState(380);
				match(T__5);
				setState(381);
				eIdentifierOrMarker();
				}
				break;
			}
			setState(385);
			optionalAttributeValuePairs();
			setState(386);
			match(T__4);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class AttributionExpressionContext extends ParserRuleContext {
		public OptionalIdentifierContext optionalIdentifier() {
			return getRuleContext(OptionalIdentifierContext.class,0);
		}
		public EIdentifierContext eIdentifier() {
			return getRuleContext(EIdentifierContext.class,0);
		}
		public AgIdentifierContext agIdentifier() {
			return getRuleContext(AgIdentifierContext.class,0);
		}
		public OptionalAttributeValuePairsContext optionalAttributeValuePairs() {
			return getRuleContext(OptionalAttributeValuePairsContext.class,0);
		}
		public AttributionExpressionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_attributionExpression; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).enterAttributionExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).exitAttributionExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof PROV_NVisitor ) return ((PROV_NVisitor<? extends T>)visitor).visitAttributionExpression(this);
			else return visitor.visitChildren(this);
		}
	}

	public final AttributionExpressionContext attributionExpression() throws RecognitionException {
		AttributionExpressionContext _localctx = new AttributionExpressionContext(_ctx, getState());
		enterRule(_localctx, 82, RULE_attributionExpression);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(388);
			match(T__20);
			setState(389);
			match(T__3);
			setState(390);
			optionalIdentifier();
			setState(391);
			eIdentifier();
			setState(392);
			match(T__5);
			setState(393);
			agIdentifier();
			setState(394);
			optionalAttributeValuePairs();
			setState(395);
			match(T__4);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class DelegationExpressionContext extends ParserRuleContext {
		public OptionalIdentifierContext optionalIdentifier() {
			return getRuleContext(OptionalIdentifierContext.class,0);
		}
		public List<AgIdentifierContext> agIdentifier() {
			return getRuleContexts(AgIdentifierContext.class);
		}
		public AgIdentifierContext agIdentifier(int i) {
			return getRuleContext(AgIdentifierContext.class,i);
		}
		public OptionalAttributeValuePairsContext optionalAttributeValuePairs() {
			return getRuleContext(OptionalAttributeValuePairsContext.class,0);
		}
		public AIdentifierOrMarkerContext aIdentifierOrMarker() {
			return getRuleContext(AIdentifierOrMarkerContext.class,0);
		}
		public DelegationExpressionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_delegationExpression; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).enterDelegationExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).exitDelegationExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof PROV_NVisitor ) return ((PROV_NVisitor<? extends T>)visitor).visitDelegationExpression(this);
			else return visitor.visitChildren(this);
		}
	}

	public final DelegationExpressionContext delegationExpression() throws RecognitionException {
		DelegationExpressionContext _localctx = new DelegationExpressionContext(_ctx, getState());
		enterRule(_localctx, 84, RULE_delegationExpression);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(397);
			match(T__21);
			setState(398);
			match(T__3);
			setState(399);
			optionalIdentifier();
			setState(400);
			agIdentifier();
			setState(401);
			match(T__5);
			setState(402);
			agIdentifier();
			setState(405);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,30,_ctx) ) {
			case 1:
				{
				setState(403);
				match(T__5);
				setState(404);
				aIdentifierOrMarker();
				}
				break;
			}
			setState(407);
			optionalAttributeValuePairs();
			setState(408);
			match(T__4);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class DerivationExpressionContext extends ParserRuleContext {
		public OptionalIdentifierContext optionalIdentifier() {
			return getRuleContext(OptionalIdentifierContext.class,0);
		}
		public List<EIdentifierContext> eIdentifier() {
			return getRuleContexts(EIdentifierContext.class);
		}
		public EIdentifierContext eIdentifier(int i) {
			return getRuleContext(EIdentifierContext.class,i);
		}
		public OptionalAttributeValuePairsContext optionalAttributeValuePairs() {
			return getRuleContext(OptionalAttributeValuePairsContext.class,0);
		}
		public AIdentifierOrMarkerContext aIdentifierOrMarker() {
			return getRuleContext(AIdentifierOrMarkerContext.class,0);
		}
		public GIdentifierOrMarkerContext gIdentifierOrMarker() {
			return getRuleContext(GIdentifierOrMarkerContext.class,0);
		}
		public UIdentifierOrMarkerContext uIdentifierOrMarker() {
			return getRuleContext(UIdentifierOrMarkerContext.class,0);
		}
		public DerivationExpressionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_derivationExpression; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).enterDerivationExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).exitDerivationExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof PROV_NVisitor ) return ((PROV_NVisitor<? extends T>)visitor).visitDerivationExpression(this);
			else return visitor.visitChildren(this);
		}
	}

	public final DerivationExpressionContext derivationExpression() throws RecognitionException {
		DerivationExpressionContext _localctx = new DerivationExpressionContext(_ctx, getState());
		enterRule(_localctx, 86, RULE_derivationExpression);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(410);
			match(T__22);
			setState(411);
			match(T__3);
			setState(412);
			optionalIdentifier();
			setState(413);
			eIdentifier();
			setState(414);
			match(T__5);
			setState(415);
			eIdentifier();
			setState(423);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,31,_ctx) ) {
			case 1:
				{
				setState(416);
				match(T__5);
				setState(417);
				aIdentifierOrMarker();
				setState(418);
				match(T__5);
				setState(419);
				gIdentifierOrMarker();
				setState(420);
				match(T__5);
				setState(421);
				uIdentifierOrMarker();
				}
				break;
			}
			setState(425);
			optionalAttributeValuePairs();
			setState(426);
			match(T__4);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class InfluenceExpressionContext extends ParserRuleContext {
		public OptionalIdentifierContext optionalIdentifier() {
			return getRuleContext(OptionalIdentifierContext.class,0);
		}
		public List<EIdentifierContext> eIdentifier() {
			return getRuleContexts(EIdentifierContext.class);
		}
		public EIdentifierContext eIdentifier(int i) {
			return getRuleContext(EIdentifierContext.class,i);
		}
		public OptionalAttributeValuePairsContext optionalAttributeValuePairs() {
			return getRuleContext(OptionalAttributeValuePairsContext.class,0);
		}
		public InfluenceExpressionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_influenceExpression; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).enterInfluenceExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).exitInfluenceExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof PROV_NVisitor ) return ((PROV_NVisitor<? extends T>)visitor).visitInfluenceExpression(this);
			else return visitor.visitChildren(this);
		}
	}

	public final InfluenceExpressionContext influenceExpression() throws RecognitionException {
		InfluenceExpressionContext _localctx = new InfluenceExpressionContext(_ctx, getState());
		enterRule(_localctx, 88, RULE_influenceExpression);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(428);
			match(T__23);
			setState(429);
			match(T__3);
			setState(430);
			optionalIdentifier();
			setState(431);
			eIdentifier();
			setState(432);
			match(T__5);
			setState(433);
			eIdentifier();
			setState(434);
			optionalAttributeValuePairs();
			setState(435);
			match(T__4);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class AlternateExpressionContext extends ParserRuleContext {
		public List<EIdentifierContext> eIdentifier() {
			return getRuleContexts(EIdentifierContext.class);
		}
		public EIdentifierContext eIdentifier(int i) {
			return getRuleContext(EIdentifierContext.class,i);
		}
		public AlternateExpressionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_alternateExpression; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).enterAlternateExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).exitAlternateExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof PROV_NVisitor ) return ((PROV_NVisitor<? extends T>)visitor).visitAlternateExpression(this);
			else return visitor.visitChildren(this);
		}
	}

	public final AlternateExpressionContext alternateExpression() throws RecognitionException {
		AlternateExpressionContext _localctx = new AlternateExpressionContext(_ctx, getState());
		enterRule(_localctx, 90, RULE_alternateExpression);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(437);
			match(T__24);
			setState(438);
			match(T__3);
			setState(439);
			eIdentifier();
			setState(440);
			match(T__5);
			setState(441);
			eIdentifier();
			setState(442);
			match(T__4);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class SpecializationExpressionContext extends ParserRuleContext {
		public List<EIdentifierContext> eIdentifier() {
			return getRuleContexts(EIdentifierContext.class);
		}
		public EIdentifierContext eIdentifier(int i) {
			return getRuleContext(EIdentifierContext.class,i);
		}
		public SpecializationExpressionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_specializationExpression; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).enterSpecializationExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).exitSpecializationExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof PROV_NVisitor ) return ((PROV_NVisitor<? extends T>)visitor).visitSpecializationExpression(this);
			else return visitor.visitChildren(this);
		}
	}

	public final SpecializationExpressionContext specializationExpression() throws RecognitionException {
		SpecializationExpressionContext _localctx = new SpecializationExpressionContext(_ctx, getState());
		enterRule(_localctx, 92, RULE_specializationExpression);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(444);
			match(T__25);
			setState(445);
			match(T__3);
			setState(446);
			eIdentifier();
			setState(447);
			match(T__5);
			setState(448);
			eIdentifier();
			setState(449);
			match(T__4);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class MembershipExpressionContext extends ParserRuleContext {
		public CIdentifierContext cIdentifier() {
			return getRuleContext(CIdentifierContext.class,0);
		}
		public EIdentifierContext eIdentifier() {
			return getRuleContext(EIdentifierContext.class,0);
		}
		public MembershipExpressionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_membershipExpression; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).enterMembershipExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).exitMembershipExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof PROV_NVisitor ) return ((PROV_NVisitor<? extends T>)visitor).visitMembershipExpression(this);
			else return visitor.visitChildren(this);
		}
	}

	public final MembershipExpressionContext membershipExpression() throws RecognitionException {
		MembershipExpressionContext _localctx = new MembershipExpressionContext(_ctx, getState());
		enterRule(_localctx, 94, RULE_membershipExpression);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(451);
			match(T__26);
			setState(452);
			match(T__3);
			setState(453);
			cIdentifier();
			setState(454);
			match(T__5);
			setState(455);
			eIdentifier();
			setState(456);
			match(T__4);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ExtensibilityExpressionContext extends ParserRuleContext {
		public TerminalNode QUALIFIED_NAME() { return getToken(PROV_NParser.QUALIFIED_NAME, 0); }
		public OptionalIdentifierContext optionalIdentifier() {
			return getRuleContext(OptionalIdentifierContext.class,0);
		}
		public List<ExtensibilityArgumentContext> extensibilityArgument() {
			return getRuleContexts(ExtensibilityArgumentContext.class);
		}
		public ExtensibilityArgumentContext extensibilityArgument(int i) {
			return getRuleContext(ExtensibilityArgumentContext.class,i);
		}
		public OptionalAttributeValuePairsContext optionalAttributeValuePairs() {
			return getRuleContext(OptionalAttributeValuePairsContext.class,0);
		}
		public ExtensibilityExpressionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_extensibilityExpression; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).enterExtensibilityExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).exitExtensibilityExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof PROV_NVisitor ) return ((PROV_NVisitor<? extends T>)visitor).visitExtensibilityExpression(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ExtensibilityExpressionContext extensibilityExpression() throws RecognitionException {
		ExtensibilityExpressionContext _localctx = new ExtensibilityExpressionContext(_ctx, getState());
		enterRule(_localctx, 96, RULE_extensibilityExpression);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(458);
			match(QUALIFIED_NAME);
			setState(459);
			match(T__3);
			setState(460);
			optionalIdentifier();
			setState(461);
			extensibilityArgument();
			setState(466);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,32,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(462);
					match(T__5);
					setState(463);
					extensibilityArgument();
					}
					} 
				}
				setState(468);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,32,_ctx);
			}
			setState(469);
			optionalAttributeValuePairs();
			setState(470);
			match(T__4);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ExtensibilityArgumentContext extends ParserRuleContext {
		public IdentifierOrMarkerContext identifierOrMarker() {
			return getRuleContext(IdentifierOrMarkerContext.class,0);
		}
		public LiteralContext literal() {
			return getRuleContext(LiteralContext.class,0);
		}
		public TimeContext time() {
			return getRuleContext(TimeContext.class,0);
		}
		public ExtensibilityExpressionContext extensibilityExpression() {
			return getRuleContext(ExtensibilityExpressionContext.class,0);
		}
		public ExtensibilityTupleContext extensibilityTuple() {
			return getRuleContext(ExtensibilityTupleContext.class,0);
		}
		public ExtensibilityArgumentContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_extensibilityArgument; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).enterExtensibilityArgument(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).exitExtensibilityArgument(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof PROV_NVisitor ) return ((PROV_NVisitor<? extends T>)visitor).visitExtensibilityArgument(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ExtensibilityArgumentContext extensibilityArgument() throws RecognitionException {
		ExtensibilityArgumentContext _localctx = new ExtensibilityArgumentContext(_ctx, getState());
		enterRule(_localctx, 98, RULE_extensibilityArgument);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(477);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,33,_ctx) ) {
			case 1:
				{
				setState(472);
				identifierOrMarker();
				}
				break;
			case 2:
				{
				setState(473);
				literal();
				}
				break;
			case 3:
				{
				setState(474);
				time();
				}
				break;
			case 4:
				{
				setState(475);
				extensibilityExpression();
				}
				break;
			case 5:
				{
				setState(476);
				extensibilityTuple();
				}
				break;
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ExtensibilityTupleContext extends ParserRuleContext {
		public List<ExtensibilityArgumentContext> extensibilityArgument() {
			return getRuleContexts(ExtensibilityArgumentContext.class);
		}
		public ExtensibilityArgumentContext extensibilityArgument(int i) {
			return getRuleContext(ExtensibilityArgumentContext.class,i);
		}
		public ExtensibilityTupleContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_extensibilityTuple; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).enterExtensibilityTuple(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof PROV_NListener ) ((PROV_NListener)listener).exitExtensibilityTuple(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof PROV_NVisitor ) return ((PROV_NVisitor<? extends T>)visitor).visitExtensibilityTuple(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ExtensibilityTupleContext extensibilityTuple() throws RecognitionException {
		ExtensibilityTupleContext _localctx = new ExtensibilityTupleContext(_ctx, getState());
		enterRule(_localctx, 100, RULE_extensibilityTuple);
		int _la;
		try {
			setState(501);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__27:
				enterOuterAlt(_localctx, 1);
				{
				setState(479);
				match(T__27);
				setState(480);
				extensibilityArgument();
				setState(485);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==T__5) {
					{
					{
					setState(481);
					match(T__5);
					setState(482);
					extensibilityArgument();
					}
					}
					setState(487);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				setState(488);
				match(T__28);
				}
				break;
			case T__3:
				enterOuterAlt(_localctx, 2);
				{
				setState(490);
				match(T__3);
				setState(491);
				extensibilityArgument();
				setState(496);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==T__5) {
					{
					{
					setState(492);
					match(T__5);
					setState(493);
					extensibilityArgument();
					}
					}
					setState(498);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				setState(499);
				match(T__4);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static final String _serializedATN =
		"\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\3:\u01fa\4\2\t\2\4"+
		"\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\4\t\t\t\4\n\t\n\4\13\t"+
		"\13\4\f\t\f\4\r\t\r\4\16\t\16\4\17\t\17\4\20\t\20\4\21\t\21\4\22\t\22"+
		"\4\23\t\23\4\24\t\24\4\25\t\25\4\26\t\26\4\27\t\27\4\30\t\30\4\31\t\31"+
		"\4\32\t\32\4\33\t\33\4\34\t\34\4\35\t\35\4\36\t\36\4\37\t\37\4 \t \4!"+
		"\t!\4\"\t\"\4#\t#\4$\t$\4%\t%\4&\t&\4\'\t\'\4(\t(\4)\t)\4*\t*\4+\t+\4"+
		",\t,\4-\t-\4.\t.\4/\t/\4\60\t\60\4\61\t\61\4\62\t\62\4\63\t\63\4\64\t"+
		"\64\3\2\3\2\5\2k\n\2\3\2\7\2n\n\2\f\2\16\2q\13\2\3\2\3\2\7\2u\n\2\f\2"+
		"\16\2x\13\2\5\2z\n\2\3\2\3\2\3\3\3\3\5\3\u0080\n\3\3\3\7\3\u0083\n\3\f"+
		"\3\16\3\u0086\13\3\3\4\3\4\3\4\3\5\3\5\3\5\3\5\3\6\3\6\3\7\3\7\3\7\5\7"+
		"\u0094\n\7\3\7\7\7\u0097\n\7\f\7\16\7\u009a\13\7\3\7\3\7\3\b\3\b\3\t\3"+
		"\t\3\t\3\t\3\t\3\t\3\t\3\t\3\t\3\t\3\t\3\t\3\t\3\t\3\t\3\t\3\t\3\t\5\t"+
		"\u00b2\n\t\3\n\3\n\3\n\3\n\3\n\3\n\3\13\3\13\3\13\3\13\3\13\5\13\u00bf"+
		"\n\13\3\f\3\f\3\f\3\f\7\f\u00c5\n\f\f\f\16\f\u00c8\13\f\5\f\u00ca\n\f"+
		"\3\r\3\r\3\r\3\r\3\16\3\16\3\17\3\17\5\17\u00d4\n\17\3\20\3\20\3\20\3"+
		"\20\3\21\3\21\3\22\3\22\5\22\u00de\n\22\3\22\3\22\5\22\u00e2\n\22\3\23"+
		"\3\23\3\23\3\23\3\23\3\23\3\23\3\23\5\23\u00ec\n\23\3\23\3\23\3\23\3\24"+
		"\3\24\5\24\u00f3\n\24\3\25\3\25\3\26\3\26\3\26\3\26\3\26\3\26\3\26\3\26"+
		"\3\26\5\26\u0100\n\26\3\26\3\26\3\26\3\27\3\27\3\27\5\27\u0108\n\27\3"+
		"\30\3\30\5\30\u010c\n\30\3\31\3\31\3\32\3\32\5\32\u0112\n\32\3\33\3\33"+
		"\5\33\u0116\n\33\3\34\3\34\3\35\3\35\5\35\u011c\n\35\3\36\3\36\3\37\3"+
		"\37\3 \3 \3!\3!\5!\u0126\n!\3\"\3\"\3#\3#\5#\u012c\n#\3$\3$\3$\3$\3$\3"+
		"$\3$\3$\3$\5$\u0137\n$\3$\3$\3$\3%\3%\3%\3%\3%\3%\3%\3%\3%\3%\3%\5%\u0147"+
		"\n%\3%\3%\3%\3&\3&\3&\3&\3&\3&\3&\3&\3&\3&\3&\5&\u0157\n&\3&\3&\3&\3\'"+
		"\3\'\3\'\3\'\3\'\3\'\3\'\3\'\3\'\5\'\u0165\n\'\3\'\3\'\3\'\3(\3(\3(\3"+
		"(\3(\3(\3(\3(\3(\3)\3)\3)\3)\3)\3)\3*\3*\3*\3*\3*\3*\3*\3*\3*\5*\u0182"+
		"\n*\3*\3*\3*\3+\3+\3+\3+\3+\3+\3+\3+\3+\3,\3,\3,\3,\3,\3,\3,\3,\5,\u0198"+
		"\n,\3,\3,\3,\3-\3-\3-\3-\3-\3-\3-\3-\3-\3-\3-\3-\3-\5-\u01aa\n-\3-\3-"+
		"\3-\3.\3.\3.\3.\3.\3.\3.\3.\3.\3/\3/\3/\3/\3/\3/\3/\3\60\3\60\3\60\3\60"+
		"\3\60\3\60\3\60\3\61\3\61\3\61\3\61\3\61\3\61\3\61\3\62\3\62\3\62\3\62"+
		"\3\62\3\62\7\62\u01d3\n\62\f\62\16\62\u01d6\13\62\3\62\3\62\3\62\3\63"+
		"\3\63\3\63\3\63\3\63\5\63\u01e0\n\63\3\64\3\64\3\64\3\64\7\64\u01e6\n"+
		"\64\f\64\16\64\u01e9\13\64\3\64\3\64\3\64\3\64\3\64\3\64\7\64\u01f1\n"+
		"\64\f\64\16\64\u01f4\13\64\3\64\3\64\5\64\u01f8\n\64\3\64\2\2\65\2\4\6"+
		"\b\n\f\16\20\22\24\26\30\32\34\36 \"$&(*,.\60\62\64\668:<>@BDFHJLNPRT"+
		"VXZ\\^`bdf\2\2\2\u01ff\2h\3\2\2\2\4\177\3\2\2\2\6\u0087\3\2\2\2\b\u008a"+
		"\3\2\2\2\n\u008e\3\2\2\2\f\u0090\3\2\2\2\16\u009d\3\2\2\2\20\u00b1\3\2"+
		"\2\2\22\u00b3\3\2\2\2\24\u00be\3\2\2\2\26\u00c9\3\2\2\2\30\u00cb\3\2\2"+
		"\2\32\u00cf\3\2\2\2\34\u00d3\3\2\2\2\36\u00d5\3\2\2\2 \u00d9\3\2\2\2\""+
		"\u00e1\3\2\2\2$\u00e3\3\2\2\2&\u00f2\3\2\2\2(\u00f4\3\2\2\2*\u00f6\3\2"+
		"\2\2,\u0107\3\2\2\2.\u010b\3\2\2\2\60\u010d\3\2\2\2\62\u0111\3\2\2\2\64"+
		"\u0115\3\2\2\2\66\u0117\3\2\2\28\u011b\3\2\2\2:\u011d\3\2\2\2<\u011f\3"+
		"\2\2\2>\u0121\3\2\2\2@\u0125\3\2\2\2B\u0127\3\2\2\2D\u012b\3\2\2\2F\u012d"+
		"\3\2\2\2H\u013b\3\2\2\2J\u014b\3\2\2\2L\u015b\3\2\2\2N\u0169\3\2\2\2P"+
		"\u0172\3\2\2\2R\u0178\3\2\2\2T\u0186\3\2\2\2V\u018f\3\2\2\2X\u019c\3\2"+
		"\2\2Z\u01ae\3\2\2\2\\\u01b7\3\2\2\2^\u01be\3\2\2\2`\u01c5\3\2\2\2b\u01cc"+
		"\3\2\2\2d\u01df\3\2\2\2f\u01f7\3\2\2\2hj\7 \2\2ik\5\4\3\2ji\3\2\2\2jk"+
		"\3\2\2\2ko\3\2\2\2ln\5\20\t\2ml\3\2\2\2nq\3\2\2\2om\3\2\2\2op\3\2\2\2"+
		"py\3\2\2\2qo\3\2\2\2rv\5\f\7\2su\5\f\7\2ts\3\2\2\2ux\3\2\2\2vt\3\2\2\2"+
		"vw\3\2\2\2wz\3\2\2\2xv\3\2\2\2yr\3\2\2\2yz\3\2\2\2z{\3\2\2\2{|\7!\2\2"+
		"|\3\3\2\2\2}\u0080\5\6\4\2~\u0080\5\b\5\2\177}\3\2\2\2\177~\3\2\2\2\u0080"+
		"\u0084\3\2\2\2\u0081\u0083\5\b\5\2\u0082\u0081\3\2\2\2\u0083\u0086\3\2"+
		"\2\2\u0084\u0082\3\2\2\2\u0084\u0085\3\2\2\2\u0085\5\3\2\2\2\u0086\u0084"+
		"\3\2\2\2\u0087\u0088\7\3\2\2\u0088\u0089\7\'\2\2\u0089\7\3\2\2\2\u008a"+
		"\u008b\7\4\2\2\u008b\u008c\7*\2\2\u008c\u008d\5\n\6\2\u008d\t\3\2\2\2"+
		"\u008e\u008f\7\'\2\2\u008f\13\3\2\2\2\u0090\u0091\7\"\2\2\u0091\u0093"+
		"\5\16\b\2\u0092\u0094\5\4\3\2\u0093\u0092\3\2\2\2\u0093\u0094\3\2\2\2"+
		"\u0094\u0098\3\2\2\2\u0095\u0097\5\20\t\2\u0096\u0095\3\2\2\2\u0097\u009a"+
		"\3\2\2\2\u0098\u0096\3\2\2\2\u0098\u0099\3\2\2\2\u0099\u009b\3\2\2\2\u009a"+
		"\u0098\3\2\2\2\u009b\u009c\7#\2\2\u009c\r\3\2\2\2\u009d\u009e\7-\2\2\u009e"+
		"\17\3\2\2\2\u009f\u00b2\5\22\n\2\u00a0\u00b2\5$\23\2\u00a1\u00b2\5*\26"+
		"\2\u00a2\u00b2\5F$\2\u00a3\u00b2\5H%\2\u00a4\u00b2\5J&\2\u00a5\u00b2\5"+
		"L\'\2\u00a6\u00b2\5N(\2\u00a7\u00b2\5P)\2\u00a8\u00b2\5R*\2\u00a9\u00b2"+
		"\5T+\2\u00aa\u00b2\5V,\2\u00ab\u00b2\5X-\2\u00ac\u00b2\5Z.\2\u00ad\u00b2"+
		"\5\\/\2\u00ae\u00b2\5^\60\2\u00af\u00b2\5`\61\2\u00b0\u00b2\5b\62\2\u00b1"+
		"\u009f\3\2\2\2\u00b1\u00a0\3\2\2\2\u00b1\u00a1\3\2\2\2\u00b1\u00a2\3\2"+
		"\2\2\u00b1\u00a3\3\2\2\2\u00b1\u00a4\3\2\2\2\u00b1\u00a5\3\2\2\2\u00b1"+
		"\u00a6\3\2\2\2\u00b1\u00a7\3\2\2\2\u00b1\u00a8\3\2\2\2\u00b1\u00a9\3\2"+
		"\2\2\u00b1\u00aa\3\2\2\2\u00b1\u00ab\3\2\2\2\u00b1\u00ac\3\2\2\2\u00b1"+
		"\u00ad\3\2\2\2\u00b1\u00ae\3\2\2\2\u00b1\u00af\3\2\2\2\u00b1\u00b0\3\2"+
		"\2\2\u00b2\21\3\2\2\2\u00b3\u00b4\7\5\2\2\u00b4\u00b5\7\6\2\2\u00b5\u00b6"+
		"\5\16\b\2\u00b6\u00b7\5\24\13\2\u00b7\u00b8\7\7\2\2\u00b8\23\3\2\2\2\u00b9"+
		"\u00ba\7\b\2\2\u00ba\u00bb\7\t\2\2\u00bb\u00bc\5\26\f\2\u00bc\u00bd\7"+
		"\n\2\2\u00bd\u00bf\3\2\2\2\u00be\u00b9\3\2\2\2\u00be\u00bf\3\2\2\2\u00bf"+
		"\25\3\2\2\2\u00c0\u00ca\3\2\2\2\u00c1\u00c6\5\30\r\2\u00c2\u00c3\7\b\2"+
		"\2\u00c3\u00c5\5\30\r\2\u00c4\u00c2\3\2\2\2\u00c5\u00c8\3\2\2\2\u00c6"+
		"\u00c4\3\2\2\2\u00c6\u00c7\3\2\2\2\u00c7\u00ca\3\2\2\2\u00c8\u00c6\3\2"+
		"\2\2\u00c9\u00c0\3\2\2\2\u00c9\u00c1\3\2\2\2\u00ca\27\3\2\2\2\u00cb\u00cc"+
		"\5\32\16\2\u00cc\u00cd\7\13\2\2\u00cd\u00ce\5\34\17\2\u00ce\31\3\2\2\2"+
		"\u00cf\u00d0\7-\2\2\u00d0\33\3\2\2\2\u00d1\u00d4\5\36\20\2\u00d2\u00d4"+
		"\5\"\22\2\u00d3\u00d1\3\2\2\2\u00d3\u00d2\3\2\2\2\u00d4\35\3\2\2\2\u00d5"+
		"\u00d6\7\63\2\2\u00d6\u00d7\7\f\2\2\u00d7\u00d8\5 \21\2\u00d8\37\3\2\2"+
		"\2\u00d9\u00da\7-\2\2\u00da!\3\2\2\2\u00db\u00dd\7\63\2\2\u00dc\u00de"+
		"\7:\2\2\u00dd\u00dc\3\2\2\2\u00dd\u00de\3\2\2\2\u00de\u00e2\3\2\2\2\u00df"+
		"\u00e2\7\64\2\2\u00e0\u00e2\7\65\2\2\u00e1\u00db\3\2\2\2\u00e1\u00df\3"+
		"\2\2\2\u00e1\u00e0\3\2\2\2\u00e2#\3\2\2\2\u00e3\u00e4\7\r\2\2\u00e4\u00e5"+
		"\7\6\2\2\u00e5\u00eb\5\16\b\2\u00e6\u00e7\7\b\2\2\u00e7\u00e8\5&\24\2"+
		"\u00e8\u00e9\7\b\2\2\u00e9\u00ea\5&\24\2\u00ea\u00ec\3\2\2\2\u00eb\u00e6"+
		"\3\2\2\2\u00eb\u00ec\3\2\2\2\u00ec\u00ed\3\2\2\2\u00ed\u00ee\5\24\13\2"+
		"\u00ee\u00ef\7\7\2\2\u00ef%\3\2\2\2\u00f0\u00f3\5(\25\2\u00f1\u00f3\7"+
		",\2\2\u00f2\u00f0\3\2\2\2\u00f2\u00f1\3\2\2\2\u00f3\'\3\2\2\2\u00f4\u00f5"+
		"\79\2\2\u00f5)\3\2\2\2\u00f6\u00f7\7\16\2\2\u00f7\u00f8\7\6\2\2\u00f8"+
		"\u00f9\5,\27\2\u00f9\u00ff\5\60\31\2\u00fa\u00fb\7\b\2\2\u00fb\u00fc\5"+
		"\64\33\2\u00fc\u00fd\7\b\2\2\u00fd\u00fe\5&\24\2\u00fe\u0100\3\2\2\2\u00ff"+
		"\u00fa\3\2\2\2\u00ff\u0100\3\2\2\2\u0100\u0101\3\2\2\2\u0101\u0102\5\24"+
		"\13\2\u0102\u0103\7\7\2\2\u0103+\3\2\2\2\u0104\u0105\5.\30\2\u0105\u0106"+
		"\7\17\2\2\u0106\u0108\3\2\2\2\u0107\u0104\3\2\2\2\u0107\u0108\3\2\2\2"+
		"\u0108-\3\2\2\2\u0109\u010c\5\16\b\2\u010a\u010c\7,\2\2\u010b\u0109\3"+
		"\2\2\2\u010b\u010a\3\2\2\2\u010c/\3\2\2\2\u010d\u010e\5\16\b\2\u010e\61"+
		"\3\2\2\2\u010f\u0112\5\60\31\2\u0110\u0112\7,\2\2\u0111\u010f\3\2\2\2"+
		"\u0111\u0110\3\2\2\2\u0112\63\3\2\2\2\u0113\u0116\5\66\34\2\u0114\u0116"+
		"\7,\2\2\u0115\u0113\3\2\2\2\u0115\u0114\3\2\2\2\u0116\65\3\2\2\2\u0117"+
		"\u0118\5\16\b\2\u0118\67\3\2\2\2\u0119\u011c\5:\36\2\u011a\u011c\7,\2"+
		"\2\u011b\u0119\3\2\2\2\u011b\u011a\3\2\2\2\u011c9\3\2\2\2\u011d\u011e"+
		"\5\16\b\2\u011e;\3\2\2\2\u011f\u0120\5\16\b\2\u0120=\3\2\2\2\u0121\u0122"+
		"\5\16\b\2\u0122?\3\2\2\2\u0123\u0126\5> \2\u0124\u0126\7,\2\2\u0125\u0123"+
		"\3\2\2\2\u0125\u0124\3\2\2\2\u0126A\3\2\2\2\u0127\u0128\5\16\b\2\u0128"+
		"C\3\2\2\2\u0129\u012c\5B\"\2\u012a\u012c\7,\2\2\u012b\u0129\3\2\2\2\u012b"+
		"\u012a\3\2\2\2\u012cE\3\2\2\2\u012d\u012e\7\20\2\2\u012e\u012f\7\6\2\2"+
		"\u012f\u0130\5,\27\2\u0130\u0136\5\66\34\2\u0131\u0132\7\b\2\2\u0132\u0133"+
		"\5\62\32\2\u0133\u0134\7\b\2\2\u0134\u0135\5&\24\2\u0135\u0137\3\2\2\2"+
		"\u0136\u0131\3\2\2\2\u0136\u0137\3\2\2\2\u0137\u0138\3\2\2\2\u0138\u0139"+
		"\5\24\13\2\u0139\u013a\7\7\2\2\u013aG\3\2\2\2\u013b\u013c\7\21\2\2\u013c"+
		"\u013d\7\6\2\2\u013d\u013e\5,\27\2\u013e\u0146\5\66\34\2\u013f\u0140\7"+
		"\b\2\2\u0140\u0141\5\62\32\2\u0141\u0142\7\b\2\2\u0142\u0143\5\64\33\2"+
		"\u0143\u0144\7\b\2\2\u0144\u0145\5&\24\2\u0145\u0147\3\2\2\2\u0146\u013f"+
		"\3\2\2\2\u0146\u0147\3\2\2\2\u0147\u0148\3\2\2\2\u0148\u0149\5\24\13\2"+
		"\u0149\u014a\7\7\2\2\u014aI\3\2\2\2\u014b\u014c\7\22\2\2\u014c\u014d\7"+
		"\6\2\2\u014d\u014e\5,\27\2\u014e\u0156\5\66\34\2\u014f\u0150\7\b\2\2\u0150"+
		"\u0151\5\62\32\2\u0151\u0152\7\b\2\2\u0152\u0153\5\64\33\2\u0153\u0154"+
		"\7\b\2\2\u0154\u0155\5&\24\2\u0155\u0157\3\2\2\2\u0156\u014f\3\2\2\2\u0156"+
		"\u0157\3\2\2\2\u0157\u0158\3\2\2\2\u0158\u0159\5\24\13\2\u0159\u015a\7"+
		"\7\2\2\u015aK\3\2\2\2\u015b\u015c\7\23\2\2\u015c\u015d\7\6\2\2\u015d\u015e"+
		"\5,\27\2\u015e\u0164\5\60\31\2\u015f\u0160\7\b\2\2\u0160\u0161\5\64\33"+
		"\2\u0161\u0162\7\b\2\2\u0162\u0163\5&\24\2\u0163\u0165\3\2\2\2\u0164\u015f"+
		"\3\2\2\2\u0164\u0165\3\2\2\2\u0165\u0166\3\2\2\2\u0166\u0167\5\24\13\2"+
		"\u0167\u0168\7\7\2\2\u0168M\3\2\2\2\u0169\u016a\7\24\2\2\u016a\u016b\7"+
		"\6\2\2\u016b\u016c\5,\27\2\u016c\u016d\5\66\34\2\u016d\u016e\7\b\2\2\u016e"+
		"\u016f\5\66\34\2\u016f\u0170\5\24\13\2\u0170\u0171\7\7\2\2\u0171O\3\2"+
		"\2\2\u0172\u0173\7\25\2\2\u0173\u0174\7\6\2\2\u0174\u0175\5\16\b\2\u0175"+
		"\u0176\5\24\13\2\u0176\u0177\7\7\2\2\u0177Q\3\2\2\2\u0178\u0179\7\26\2"+
		"\2\u0179\u017a\7\6\2\2\u017a\u017b\5,\27\2\u017b\u0181\5\66\34\2\u017c"+
		"\u017d\7\b\2\2\u017d\u017e\58\35\2\u017e\u017f\7\b\2\2\u017f\u0180\5\62"+
		"\32\2\u0180\u0182\3\2\2\2\u0181\u017c\3\2\2\2\u0181\u0182\3\2\2\2\u0182"+
		"\u0183\3\2\2\2\u0183\u0184\5\24\13\2\u0184\u0185\7\7\2\2\u0185S\3\2\2"+
		"\2\u0186\u0187\7\27\2\2\u0187\u0188\7\6\2\2\u0188\u0189\5,\27\2\u0189"+
		"\u018a\5\60\31\2\u018a\u018b\7\b\2\2\u018b\u018c\5:\36\2\u018c\u018d\5"+
		"\24\13\2\u018d\u018e\7\7\2\2\u018eU\3\2\2\2\u018f\u0190\7\30\2\2\u0190"+
		"\u0191\7\6\2\2\u0191\u0192\5,\27\2\u0192\u0193\5:\36\2\u0193\u0194\7\b"+
		"\2\2\u0194\u0197\5:\36\2\u0195\u0196\7\b\2\2\u0196\u0198\5\64\33\2\u0197"+
		"\u0195\3\2\2\2\u0197\u0198\3\2\2\2\u0198\u0199\3\2\2\2\u0199\u019a\5\24"+
		"\13\2\u019a\u019b\7\7\2\2\u019bW\3\2\2\2\u019c\u019d\7\31\2\2\u019d\u019e"+
		"\7\6\2\2\u019e\u019f\5,\27\2\u019f\u01a0\5\60\31\2\u01a0\u01a1\7\b\2\2"+
		"\u01a1\u01a9\5\60\31\2\u01a2\u01a3\7\b\2\2\u01a3\u01a4\5\64\33\2\u01a4"+
		"\u01a5\7\b\2\2\u01a5\u01a6\5@!\2\u01a6\u01a7\7\b\2\2\u01a7\u01a8\5D#\2"+
		"\u01a8\u01aa\3\2\2\2\u01a9\u01a2\3\2\2\2\u01a9\u01aa\3\2\2\2\u01aa\u01ab"+
		"\3\2\2\2\u01ab\u01ac\5\24\13\2\u01ac\u01ad\7\7\2\2\u01adY\3\2\2\2\u01ae"+
		"\u01af\7\32\2\2\u01af\u01b0\7\6\2\2\u01b0\u01b1\5,\27\2\u01b1\u01b2\5"+
		"\60\31\2\u01b2\u01b3\7\b\2\2\u01b3\u01b4\5\60\31\2\u01b4\u01b5\5\24\13"+
		"\2\u01b5\u01b6\7\7\2\2\u01b6[\3\2\2\2\u01b7\u01b8\7\33\2\2\u01b8\u01b9"+
		"\7\6\2\2\u01b9\u01ba\5\60\31\2\u01ba\u01bb\7\b\2\2\u01bb\u01bc\5\60\31"+
		"\2\u01bc\u01bd\7\7\2\2\u01bd]\3\2\2\2\u01be\u01bf\7\34\2\2\u01bf\u01c0"+
		"\7\6\2\2\u01c0\u01c1\5\60\31\2\u01c1\u01c2\7\b\2\2\u01c2\u01c3\5\60\31"+
		"\2\u01c3\u01c4\7\7\2\2\u01c4_\3\2\2\2\u01c5\u01c6\7\35\2\2\u01c6\u01c7"+
		"\7\6\2\2\u01c7\u01c8\5<\37\2\u01c8\u01c9\7\b\2\2\u01c9\u01ca\5\60\31\2"+
		"\u01ca\u01cb\7\7\2\2\u01cba\3\2\2\2\u01cc\u01cd\7-\2\2\u01cd\u01ce\7\6"+
		"\2\2\u01ce\u01cf\5,\27\2\u01cf\u01d4\5d\63\2\u01d0\u01d1\7\b\2\2\u01d1"+
		"\u01d3\5d\63\2\u01d2\u01d0\3\2\2\2\u01d3\u01d6\3\2\2\2\u01d4\u01d2\3\2"+
		"\2\2\u01d4\u01d5\3\2\2\2\u01d5\u01d7\3\2\2\2\u01d6\u01d4\3\2\2\2\u01d7"+
		"\u01d8\5\24\13\2\u01d8\u01d9\7\7\2\2\u01d9c\3\2\2\2\u01da\u01e0\5.\30"+
		"\2\u01db\u01e0\5\34\17\2\u01dc\u01e0\5(\25\2\u01dd\u01e0\5b\62\2\u01de"+
		"\u01e0\5f\64\2\u01df\u01da\3\2\2\2\u01df\u01db\3\2\2\2\u01df\u01dc\3\2"+
		"\2\2\u01df\u01dd\3\2\2\2\u01df\u01de\3\2\2\2\u01e0e\3\2\2\2\u01e1\u01e2"+
		"\7\36\2\2\u01e2\u01e7\5d\63\2\u01e3\u01e4\7\b\2\2\u01e4\u01e6\5d\63\2"+
		"\u01e5\u01e3\3\2\2\2\u01e6\u01e9\3\2\2\2\u01e7\u01e5\3\2\2\2\u01e7\u01e8"+
		"\3\2\2\2\u01e8\u01ea\3\2\2\2\u01e9\u01e7\3\2\2\2\u01ea\u01eb\7\37\2\2"+
		"\u01eb\u01f8\3\2\2\2\u01ec\u01ed\7\6\2\2\u01ed\u01f2\5d\63\2\u01ee\u01ef"+
		"\7\b\2\2\u01ef\u01f1\5d\63\2\u01f0\u01ee\3\2\2\2\u01f1\u01f4\3\2\2\2\u01f2"+
		"\u01f0\3\2\2\2\u01f2\u01f3\3\2\2\2\u01f3\u01f5\3\2\2\2\u01f4\u01f2\3\2"+
		"\2\2\u01f5\u01f6\7\7\2\2\u01f6\u01f8\3\2\2\2\u01f7\u01e1\3\2\2\2\u01f7"+
		"\u01ec\3\2\2\2\u01f8g\3\2\2\2\'jovy\177\u0084\u0093\u0098\u00b1\u00be"+
		"\u00c6\u00c9\u00d3\u00dd\u00e1\u00eb\u00f2\u00ff\u0107\u010b\u0111\u0115"+
		"\u011b\u0125\u012b\u0136\u0146\u0156\u0164\u0181\u0197\u01a9\u01d4\u01df"+
		"\u01e7\u01f2\u01f7";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}