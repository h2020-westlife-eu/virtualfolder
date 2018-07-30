// Generated from PROV_N.g4 by ANTLR 4.7.1
import org.antlr.v4.runtime.tree.ParseTreeListener;

/**
 * This interface defines a complete listener for a parse tree produced by
 * {@link PROV_NParser}.
 */
public interface PROV_NListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by {@link PROV_NParser#document}.
	 * @param ctx the parse tree
	 */
	void enterDocument(PROV_NParser.DocumentContext ctx);
	/**
	 * Exit a parse tree produced by {@link PROV_NParser#document}.
	 * @param ctx the parse tree
	 */
	void exitDocument(PROV_NParser.DocumentContext ctx);
	/**
	 * Enter a parse tree produced by {@link PROV_NParser#namespaceDeclarations}.
	 * @param ctx the parse tree
	 */
	void enterNamespaceDeclarations(PROV_NParser.NamespaceDeclarationsContext ctx);
	/**
	 * Exit a parse tree produced by {@link PROV_NParser#namespaceDeclarations}.
	 * @param ctx the parse tree
	 */
	void exitNamespaceDeclarations(PROV_NParser.NamespaceDeclarationsContext ctx);
	/**
	 * Enter a parse tree produced by {@link PROV_NParser#defaultNamespaceDeclaration}.
	 * @param ctx the parse tree
	 */
	void enterDefaultNamespaceDeclaration(PROV_NParser.DefaultNamespaceDeclarationContext ctx);
	/**
	 * Exit a parse tree produced by {@link PROV_NParser#defaultNamespaceDeclaration}.
	 * @param ctx the parse tree
	 */
	void exitDefaultNamespaceDeclaration(PROV_NParser.DefaultNamespaceDeclarationContext ctx);
	/**
	 * Enter a parse tree produced by {@link PROV_NParser#namespaceDeclaration}.
	 * @param ctx the parse tree
	 */
	void enterNamespaceDeclaration(PROV_NParser.NamespaceDeclarationContext ctx);
	/**
	 * Exit a parse tree produced by {@link PROV_NParser#namespaceDeclaration}.
	 * @param ctx the parse tree
	 */
	void exitNamespaceDeclaration(PROV_NParser.NamespaceDeclarationContext ctx);
	/**
	 * Enter a parse tree produced by {@link PROV_NParser#namespace}.
	 * @param ctx the parse tree
	 */
	void enterNamespace(PROV_NParser.NamespaceContext ctx);
	/**
	 * Exit a parse tree produced by {@link PROV_NParser#namespace}.
	 * @param ctx the parse tree
	 */
	void exitNamespace(PROV_NParser.NamespaceContext ctx);
	/**
	 * Enter a parse tree produced by {@link PROV_NParser#bundle}.
	 * @param ctx the parse tree
	 */
	void enterBundle(PROV_NParser.BundleContext ctx);
	/**
	 * Exit a parse tree produced by {@link PROV_NParser#bundle}.
	 * @param ctx the parse tree
	 */
	void exitBundle(PROV_NParser.BundleContext ctx);
	/**
	 * Enter a parse tree produced by {@link PROV_NParser#identifier}.
	 * @param ctx the parse tree
	 */
	void enterIdentifier(PROV_NParser.IdentifierContext ctx);
	/**
	 * Exit a parse tree produced by {@link PROV_NParser#identifier}.
	 * @param ctx the parse tree
	 */
	void exitIdentifier(PROV_NParser.IdentifierContext ctx);
	/**
	 * Enter a parse tree produced by {@link PROV_NParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterExpression(PROV_NParser.ExpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link PROV_NParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitExpression(PROV_NParser.ExpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link PROV_NParser#entityExpression}.
	 * @param ctx the parse tree
	 */
	void enterEntityExpression(PROV_NParser.EntityExpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link PROV_NParser#entityExpression}.
	 * @param ctx the parse tree
	 */
	void exitEntityExpression(PROV_NParser.EntityExpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link PROV_NParser#optionalAttributeValuePairs}.
	 * @param ctx the parse tree
	 */
	void enterOptionalAttributeValuePairs(PROV_NParser.OptionalAttributeValuePairsContext ctx);
	/**
	 * Exit a parse tree produced by {@link PROV_NParser#optionalAttributeValuePairs}.
	 * @param ctx the parse tree
	 */
	void exitOptionalAttributeValuePairs(PROV_NParser.OptionalAttributeValuePairsContext ctx);
	/**
	 * Enter a parse tree produced by {@link PROV_NParser#attributeValuePairs}.
	 * @param ctx the parse tree
	 */
	void enterAttributeValuePairs(PROV_NParser.AttributeValuePairsContext ctx);
	/**
	 * Exit a parse tree produced by {@link PROV_NParser#attributeValuePairs}.
	 * @param ctx the parse tree
	 */
	void exitAttributeValuePairs(PROV_NParser.AttributeValuePairsContext ctx);
	/**
	 * Enter a parse tree produced by {@link PROV_NParser#attributeValuePair}.
	 * @param ctx the parse tree
	 */
	void enterAttributeValuePair(PROV_NParser.AttributeValuePairContext ctx);
	/**
	 * Exit a parse tree produced by {@link PROV_NParser#attributeValuePair}.
	 * @param ctx the parse tree
	 */
	void exitAttributeValuePair(PROV_NParser.AttributeValuePairContext ctx);
	/**
	 * Enter a parse tree produced by {@link PROV_NParser#attribute}.
	 * @param ctx the parse tree
	 */
	void enterAttribute(PROV_NParser.AttributeContext ctx);
	/**
	 * Exit a parse tree produced by {@link PROV_NParser#attribute}.
	 * @param ctx the parse tree
	 */
	void exitAttribute(PROV_NParser.AttributeContext ctx);
	/**
	 * Enter a parse tree produced by {@link PROV_NParser#literal}.
	 * @param ctx the parse tree
	 */
	void enterLiteral(PROV_NParser.LiteralContext ctx);
	/**
	 * Exit a parse tree produced by {@link PROV_NParser#literal}.
	 * @param ctx the parse tree
	 */
	void exitLiteral(PROV_NParser.LiteralContext ctx);
	/**
	 * Enter a parse tree produced by {@link PROV_NParser#typedLiteral}.
	 * @param ctx the parse tree
	 */
	void enterTypedLiteral(PROV_NParser.TypedLiteralContext ctx);
	/**
	 * Exit a parse tree produced by {@link PROV_NParser#typedLiteral}.
	 * @param ctx the parse tree
	 */
	void exitTypedLiteral(PROV_NParser.TypedLiteralContext ctx);
	/**
	 * Enter a parse tree produced by {@link PROV_NParser#datatype}.
	 * @param ctx the parse tree
	 */
	void enterDatatype(PROV_NParser.DatatypeContext ctx);
	/**
	 * Exit a parse tree produced by {@link PROV_NParser#datatype}.
	 * @param ctx the parse tree
	 */
	void exitDatatype(PROV_NParser.DatatypeContext ctx);
	/**
	 * Enter a parse tree produced by {@link PROV_NParser#convenienceNotation}.
	 * @param ctx the parse tree
	 */
	void enterConvenienceNotation(PROV_NParser.ConvenienceNotationContext ctx);
	/**
	 * Exit a parse tree produced by {@link PROV_NParser#convenienceNotation}.
	 * @param ctx the parse tree
	 */
	void exitConvenienceNotation(PROV_NParser.ConvenienceNotationContext ctx);
	/**
	 * Enter a parse tree produced by {@link PROV_NParser#activityExpression}.
	 * @param ctx the parse tree
	 */
	void enterActivityExpression(PROV_NParser.ActivityExpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link PROV_NParser#activityExpression}.
	 * @param ctx the parse tree
	 */
	void exitActivityExpression(PROV_NParser.ActivityExpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link PROV_NParser#timeOrMarker}.
	 * @param ctx the parse tree
	 */
	void enterTimeOrMarker(PROV_NParser.TimeOrMarkerContext ctx);
	/**
	 * Exit a parse tree produced by {@link PROV_NParser#timeOrMarker}.
	 * @param ctx the parse tree
	 */
	void exitTimeOrMarker(PROV_NParser.TimeOrMarkerContext ctx);
	/**
	 * Enter a parse tree produced by {@link PROV_NParser#time}.
	 * @param ctx the parse tree
	 */
	void enterTime(PROV_NParser.TimeContext ctx);
	/**
	 * Exit a parse tree produced by {@link PROV_NParser#time}.
	 * @param ctx the parse tree
	 */
	void exitTime(PROV_NParser.TimeContext ctx);
	/**
	 * Enter a parse tree produced by {@link PROV_NParser#generationExpression}.
	 * @param ctx the parse tree
	 */
	void enterGenerationExpression(PROV_NParser.GenerationExpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link PROV_NParser#generationExpression}.
	 * @param ctx the parse tree
	 */
	void exitGenerationExpression(PROV_NParser.GenerationExpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link PROV_NParser#optionalIdentifier}.
	 * @param ctx the parse tree
	 */
	void enterOptionalIdentifier(PROV_NParser.OptionalIdentifierContext ctx);
	/**
	 * Exit a parse tree produced by {@link PROV_NParser#optionalIdentifier}.
	 * @param ctx the parse tree
	 */
	void exitOptionalIdentifier(PROV_NParser.OptionalIdentifierContext ctx);
	/**
	 * Enter a parse tree produced by {@link PROV_NParser#identifierOrMarker}.
	 * @param ctx the parse tree
	 */
	void enterIdentifierOrMarker(PROV_NParser.IdentifierOrMarkerContext ctx);
	/**
	 * Exit a parse tree produced by {@link PROV_NParser#identifierOrMarker}.
	 * @param ctx the parse tree
	 */
	void exitIdentifierOrMarker(PROV_NParser.IdentifierOrMarkerContext ctx);
	/**
	 * Enter a parse tree produced by {@link PROV_NParser#eIdentifier}.
	 * @param ctx the parse tree
	 */
	void enterEIdentifier(PROV_NParser.EIdentifierContext ctx);
	/**
	 * Exit a parse tree produced by {@link PROV_NParser#eIdentifier}.
	 * @param ctx the parse tree
	 */
	void exitEIdentifier(PROV_NParser.EIdentifierContext ctx);
	/**
	 * Enter a parse tree produced by {@link PROV_NParser#eIdentifierOrMarker}.
	 * @param ctx the parse tree
	 */
	void enterEIdentifierOrMarker(PROV_NParser.EIdentifierOrMarkerContext ctx);
	/**
	 * Exit a parse tree produced by {@link PROV_NParser#eIdentifierOrMarker}.
	 * @param ctx the parse tree
	 */
	void exitEIdentifierOrMarker(PROV_NParser.EIdentifierOrMarkerContext ctx);
	/**
	 * Enter a parse tree produced by {@link PROV_NParser#aIdentifierOrMarker}.
	 * @param ctx the parse tree
	 */
	void enterAIdentifierOrMarker(PROV_NParser.AIdentifierOrMarkerContext ctx);
	/**
	 * Exit a parse tree produced by {@link PROV_NParser#aIdentifierOrMarker}.
	 * @param ctx the parse tree
	 */
	void exitAIdentifierOrMarker(PROV_NParser.AIdentifierOrMarkerContext ctx);
	/**
	 * Enter a parse tree produced by {@link PROV_NParser#aIdentifier}.
	 * @param ctx the parse tree
	 */
	void enterAIdentifier(PROV_NParser.AIdentifierContext ctx);
	/**
	 * Exit a parse tree produced by {@link PROV_NParser#aIdentifier}.
	 * @param ctx the parse tree
	 */
	void exitAIdentifier(PROV_NParser.AIdentifierContext ctx);
	/**
	 * Enter a parse tree produced by {@link PROV_NParser#agIdentifierOrMarker}.
	 * @param ctx the parse tree
	 */
	void enterAgIdentifierOrMarker(PROV_NParser.AgIdentifierOrMarkerContext ctx);
	/**
	 * Exit a parse tree produced by {@link PROV_NParser#agIdentifierOrMarker}.
	 * @param ctx the parse tree
	 */
	void exitAgIdentifierOrMarker(PROV_NParser.AgIdentifierOrMarkerContext ctx);
	/**
	 * Enter a parse tree produced by {@link PROV_NParser#agIdentifier}.
	 * @param ctx the parse tree
	 */
	void enterAgIdentifier(PROV_NParser.AgIdentifierContext ctx);
	/**
	 * Exit a parse tree produced by {@link PROV_NParser#agIdentifier}.
	 * @param ctx the parse tree
	 */
	void exitAgIdentifier(PROV_NParser.AgIdentifierContext ctx);
	/**
	 * Enter a parse tree produced by {@link PROV_NParser#cIdentifier}.
	 * @param ctx the parse tree
	 */
	void enterCIdentifier(PROV_NParser.CIdentifierContext ctx);
	/**
	 * Exit a parse tree produced by {@link PROV_NParser#cIdentifier}.
	 * @param ctx the parse tree
	 */
	void exitCIdentifier(PROV_NParser.CIdentifierContext ctx);
	/**
	 * Enter a parse tree produced by {@link PROV_NParser#gIdentifier}.
	 * @param ctx the parse tree
	 */
	void enterGIdentifier(PROV_NParser.GIdentifierContext ctx);
	/**
	 * Exit a parse tree produced by {@link PROV_NParser#gIdentifier}.
	 * @param ctx the parse tree
	 */
	void exitGIdentifier(PROV_NParser.GIdentifierContext ctx);
	/**
	 * Enter a parse tree produced by {@link PROV_NParser#gIdentifierOrMarker}.
	 * @param ctx the parse tree
	 */
	void enterGIdentifierOrMarker(PROV_NParser.GIdentifierOrMarkerContext ctx);
	/**
	 * Exit a parse tree produced by {@link PROV_NParser#gIdentifierOrMarker}.
	 * @param ctx the parse tree
	 */
	void exitGIdentifierOrMarker(PROV_NParser.GIdentifierOrMarkerContext ctx);
	/**
	 * Enter a parse tree produced by {@link PROV_NParser#uIdentifier}.
	 * @param ctx the parse tree
	 */
	void enterUIdentifier(PROV_NParser.UIdentifierContext ctx);
	/**
	 * Exit a parse tree produced by {@link PROV_NParser#uIdentifier}.
	 * @param ctx the parse tree
	 */
	void exitUIdentifier(PROV_NParser.UIdentifierContext ctx);
	/**
	 * Enter a parse tree produced by {@link PROV_NParser#uIdentifierOrMarker}.
	 * @param ctx the parse tree
	 */
	void enterUIdentifierOrMarker(PROV_NParser.UIdentifierOrMarkerContext ctx);
	/**
	 * Exit a parse tree produced by {@link PROV_NParser#uIdentifierOrMarker}.
	 * @param ctx the parse tree
	 */
	void exitUIdentifierOrMarker(PROV_NParser.UIdentifierOrMarkerContext ctx);
	/**
	 * Enter a parse tree produced by {@link PROV_NParser#usageExpression}.
	 * @param ctx the parse tree
	 */
	void enterUsageExpression(PROV_NParser.UsageExpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link PROV_NParser#usageExpression}.
	 * @param ctx the parse tree
	 */
	void exitUsageExpression(PROV_NParser.UsageExpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link PROV_NParser#startExpression}.
	 * @param ctx the parse tree
	 */
	void enterStartExpression(PROV_NParser.StartExpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link PROV_NParser#startExpression}.
	 * @param ctx the parse tree
	 */
	void exitStartExpression(PROV_NParser.StartExpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link PROV_NParser#endExpression}.
	 * @param ctx the parse tree
	 */
	void enterEndExpression(PROV_NParser.EndExpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link PROV_NParser#endExpression}.
	 * @param ctx the parse tree
	 */
	void exitEndExpression(PROV_NParser.EndExpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link PROV_NParser#invalidationExpression}.
	 * @param ctx the parse tree
	 */
	void enterInvalidationExpression(PROV_NParser.InvalidationExpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link PROV_NParser#invalidationExpression}.
	 * @param ctx the parse tree
	 */
	void exitInvalidationExpression(PROV_NParser.InvalidationExpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link PROV_NParser#communicationExpression}.
	 * @param ctx the parse tree
	 */
	void enterCommunicationExpression(PROV_NParser.CommunicationExpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link PROV_NParser#communicationExpression}.
	 * @param ctx the parse tree
	 */
	void exitCommunicationExpression(PROV_NParser.CommunicationExpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link PROV_NParser#agentExpression}.
	 * @param ctx the parse tree
	 */
	void enterAgentExpression(PROV_NParser.AgentExpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link PROV_NParser#agentExpression}.
	 * @param ctx the parse tree
	 */
	void exitAgentExpression(PROV_NParser.AgentExpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link PROV_NParser#associationExpression}.
	 * @param ctx the parse tree
	 */
	void enterAssociationExpression(PROV_NParser.AssociationExpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link PROV_NParser#associationExpression}.
	 * @param ctx the parse tree
	 */
	void exitAssociationExpression(PROV_NParser.AssociationExpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link PROV_NParser#attributionExpression}.
	 * @param ctx the parse tree
	 */
	void enterAttributionExpression(PROV_NParser.AttributionExpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link PROV_NParser#attributionExpression}.
	 * @param ctx the parse tree
	 */
	void exitAttributionExpression(PROV_NParser.AttributionExpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link PROV_NParser#delegationExpression}.
	 * @param ctx the parse tree
	 */
	void enterDelegationExpression(PROV_NParser.DelegationExpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link PROV_NParser#delegationExpression}.
	 * @param ctx the parse tree
	 */
	void exitDelegationExpression(PROV_NParser.DelegationExpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link PROV_NParser#derivationExpression}.
	 * @param ctx the parse tree
	 */
	void enterDerivationExpression(PROV_NParser.DerivationExpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link PROV_NParser#derivationExpression}.
	 * @param ctx the parse tree
	 */
	void exitDerivationExpression(PROV_NParser.DerivationExpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link PROV_NParser#influenceExpression}.
	 * @param ctx the parse tree
	 */
	void enterInfluenceExpression(PROV_NParser.InfluenceExpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link PROV_NParser#influenceExpression}.
	 * @param ctx the parse tree
	 */
	void exitInfluenceExpression(PROV_NParser.InfluenceExpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link PROV_NParser#alternateExpression}.
	 * @param ctx the parse tree
	 */
	void enterAlternateExpression(PROV_NParser.AlternateExpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link PROV_NParser#alternateExpression}.
	 * @param ctx the parse tree
	 */
	void exitAlternateExpression(PROV_NParser.AlternateExpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link PROV_NParser#specializationExpression}.
	 * @param ctx the parse tree
	 */
	void enterSpecializationExpression(PROV_NParser.SpecializationExpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link PROV_NParser#specializationExpression}.
	 * @param ctx the parse tree
	 */
	void exitSpecializationExpression(PROV_NParser.SpecializationExpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link PROV_NParser#membershipExpression}.
	 * @param ctx the parse tree
	 */
	void enterMembershipExpression(PROV_NParser.MembershipExpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link PROV_NParser#membershipExpression}.
	 * @param ctx the parse tree
	 */
	void exitMembershipExpression(PROV_NParser.MembershipExpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link PROV_NParser#extensibilityExpression}.
	 * @param ctx the parse tree
	 */
	void enterExtensibilityExpression(PROV_NParser.ExtensibilityExpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link PROV_NParser#extensibilityExpression}.
	 * @param ctx the parse tree
	 */
	void exitExtensibilityExpression(PROV_NParser.ExtensibilityExpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link PROV_NParser#extensibilityArgument}.
	 * @param ctx the parse tree
	 */
	void enterExtensibilityArgument(PROV_NParser.ExtensibilityArgumentContext ctx);
	/**
	 * Exit a parse tree produced by {@link PROV_NParser#extensibilityArgument}.
	 * @param ctx the parse tree
	 */
	void exitExtensibilityArgument(PROV_NParser.ExtensibilityArgumentContext ctx);
	/**
	 * Enter a parse tree produced by {@link PROV_NParser#extensibilityTuple}.
	 * @param ctx the parse tree
	 */
	void enterExtensibilityTuple(PROV_NParser.ExtensibilityTupleContext ctx);
	/**
	 * Exit a parse tree produced by {@link PROV_NParser#extensibilityTuple}.
	 * @param ctx the parse tree
	 */
	void exitExtensibilityTuple(PROV_NParser.ExtensibilityTupleContext ctx);
}