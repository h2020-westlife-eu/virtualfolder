// Generated from PROV_N.g4 by ANTLR 4.7.1
import org.antlr.v4.runtime.tree.ParseTreeVisitor;

/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by {@link PROV_NParser}.
 *
 * @param <T> The return type of the visit operation. Use {@link Void} for
 * operations with no return type.
 */
public interface PROV_NVisitor<T> extends ParseTreeVisitor<T> {
	/**
	 * Visit a parse tree produced by {@link PROV_NParser#document}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitDocument(PROV_NParser.DocumentContext ctx);
	/**
	 * Visit a parse tree produced by {@link PROV_NParser#namespaceDeclarations}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitNamespaceDeclarations(PROV_NParser.NamespaceDeclarationsContext ctx);
	/**
	 * Visit a parse tree produced by {@link PROV_NParser#defaultNamespaceDeclaration}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitDefaultNamespaceDeclaration(PROV_NParser.DefaultNamespaceDeclarationContext ctx);
	/**
	 * Visit a parse tree produced by {@link PROV_NParser#namespaceDeclaration}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitNamespaceDeclaration(PROV_NParser.NamespaceDeclarationContext ctx);
	/**
	 * Visit a parse tree produced by {@link PROV_NParser#namespace}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitNamespace(PROV_NParser.NamespaceContext ctx);
	/**
	 * Visit a parse tree produced by {@link PROV_NParser#bundle}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitBundle(PROV_NParser.BundleContext ctx);
	/**
	 * Visit a parse tree produced by {@link PROV_NParser#identifier}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitIdentifier(PROV_NParser.IdentifierContext ctx);
	/**
	 * Visit a parse tree produced by {@link PROV_NParser#expression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitExpression(PROV_NParser.ExpressionContext ctx);
	/**
	 * Visit a parse tree produced by {@link PROV_NParser#entityExpression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitEntityExpression(PROV_NParser.EntityExpressionContext ctx);
	/**
	 * Visit a parse tree produced by {@link PROV_NParser#optionalAttributeValuePairs}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitOptionalAttributeValuePairs(PROV_NParser.OptionalAttributeValuePairsContext ctx);
	/**
	 * Visit a parse tree produced by {@link PROV_NParser#attributeValuePairs}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitAttributeValuePairs(PROV_NParser.AttributeValuePairsContext ctx);
	/**
	 * Visit a parse tree produced by {@link PROV_NParser#attributeValuePair}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitAttributeValuePair(PROV_NParser.AttributeValuePairContext ctx);
	/**
	 * Visit a parse tree produced by {@link PROV_NParser#attribute}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitAttribute(PROV_NParser.AttributeContext ctx);
	/**
	 * Visit a parse tree produced by {@link PROV_NParser#literal}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitLiteral(PROV_NParser.LiteralContext ctx);
	/**
	 * Visit a parse tree produced by {@link PROV_NParser#typedLiteral}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitTypedLiteral(PROV_NParser.TypedLiteralContext ctx);
	/**
	 * Visit a parse tree produced by {@link PROV_NParser#datatype}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitDatatype(PROV_NParser.DatatypeContext ctx);
	/**
	 * Visit a parse tree produced by {@link PROV_NParser#convenienceNotation}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitConvenienceNotation(PROV_NParser.ConvenienceNotationContext ctx);
	/**
	 * Visit a parse tree produced by {@link PROV_NParser#activityExpression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitActivityExpression(PROV_NParser.ActivityExpressionContext ctx);
	/**
	 * Visit a parse tree produced by {@link PROV_NParser#timeOrMarker}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitTimeOrMarker(PROV_NParser.TimeOrMarkerContext ctx);
	/**
	 * Visit a parse tree produced by {@link PROV_NParser#time}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitTime(PROV_NParser.TimeContext ctx);
	/**
	 * Visit a parse tree produced by {@link PROV_NParser#generationExpression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitGenerationExpression(PROV_NParser.GenerationExpressionContext ctx);
	/**
	 * Visit a parse tree produced by {@link PROV_NParser#optionalIdentifier}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitOptionalIdentifier(PROV_NParser.OptionalIdentifierContext ctx);
	/**
	 * Visit a parse tree produced by {@link PROV_NParser#identifierOrMarker}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitIdentifierOrMarker(PROV_NParser.IdentifierOrMarkerContext ctx);
	/**
	 * Visit a parse tree produced by {@link PROV_NParser#eIdentifier}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitEIdentifier(PROV_NParser.EIdentifierContext ctx);
	/**
	 * Visit a parse tree produced by {@link PROV_NParser#eIdentifierOrMarker}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitEIdentifierOrMarker(PROV_NParser.EIdentifierOrMarkerContext ctx);
	/**
	 * Visit a parse tree produced by {@link PROV_NParser#aIdentifierOrMarker}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitAIdentifierOrMarker(PROV_NParser.AIdentifierOrMarkerContext ctx);
	/**
	 * Visit a parse tree produced by {@link PROV_NParser#aIdentifier}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitAIdentifier(PROV_NParser.AIdentifierContext ctx);
	/**
	 * Visit a parse tree produced by {@link PROV_NParser#agIdentifierOrMarker}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitAgIdentifierOrMarker(PROV_NParser.AgIdentifierOrMarkerContext ctx);
	/**
	 * Visit a parse tree produced by {@link PROV_NParser#agIdentifier}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitAgIdentifier(PROV_NParser.AgIdentifierContext ctx);
	/**
	 * Visit a parse tree produced by {@link PROV_NParser#cIdentifier}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitCIdentifier(PROV_NParser.CIdentifierContext ctx);
	/**
	 * Visit a parse tree produced by {@link PROV_NParser#gIdentifier}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitGIdentifier(PROV_NParser.GIdentifierContext ctx);
	/**
	 * Visit a parse tree produced by {@link PROV_NParser#gIdentifierOrMarker}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitGIdentifierOrMarker(PROV_NParser.GIdentifierOrMarkerContext ctx);
	/**
	 * Visit a parse tree produced by {@link PROV_NParser#uIdentifier}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitUIdentifier(PROV_NParser.UIdentifierContext ctx);
	/**
	 * Visit a parse tree produced by {@link PROV_NParser#uIdentifierOrMarker}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitUIdentifierOrMarker(PROV_NParser.UIdentifierOrMarkerContext ctx);
	/**
	 * Visit a parse tree produced by {@link PROV_NParser#usageExpression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitUsageExpression(PROV_NParser.UsageExpressionContext ctx);
	/**
	 * Visit a parse tree produced by {@link PROV_NParser#startExpression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitStartExpression(PROV_NParser.StartExpressionContext ctx);
	/**
	 * Visit a parse tree produced by {@link PROV_NParser#endExpression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitEndExpression(PROV_NParser.EndExpressionContext ctx);
	/**
	 * Visit a parse tree produced by {@link PROV_NParser#invalidationExpression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitInvalidationExpression(PROV_NParser.InvalidationExpressionContext ctx);
	/**
	 * Visit a parse tree produced by {@link PROV_NParser#communicationExpression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitCommunicationExpression(PROV_NParser.CommunicationExpressionContext ctx);
	/**
	 * Visit a parse tree produced by {@link PROV_NParser#agentExpression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitAgentExpression(PROV_NParser.AgentExpressionContext ctx);
	/**
	 * Visit a parse tree produced by {@link PROV_NParser#associationExpression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitAssociationExpression(PROV_NParser.AssociationExpressionContext ctx);
	/**
	 * Visit a parse tree produced by {@link PROV_NParser#attributionExpression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitAttributionExpression(PROV_NParser.AttributionExpressionContext ctx);
	/**
	 * Visit a parse tree produced by {@link PROV_NParser#delegationExpression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitDelegationExpression(PROV_NParser.DelegationExpressionContext ctx);
	/**
	 * Visit a parse tree produced by {@link PROV_NParser#derivationExpression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitDerivationExpression(PROV_NParser.DerivationExpressionContext ctx);
	/**
	 * Visit a parse tree produced by {@link PROV_NParser#influenceExpression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitInfluenceExpression(PROV_NParser.InfluenceExpressionContext ctx);
	/**
	 * Visit a parse tree produced by {@link PROV_NParser#alternateExpression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitAlternateExpression(PROV_NParser.AlternateExpressionContext ctx);
	/**
	 * Visit a parse tree produced by {@link PROV_NParser#specializationExpression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitSpecializationExpression(PROV_NParser.SpecializationExpressionContext ctx);
	/**
	 * Visit a parse tree produced by {@link PROV_NParser#membershipExpression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitMembershipExpression(PROV_NParser.MembershipExpressionContext ctx);
	/**
	 * Visit a parse tree produced by {@link PROV_NParser#extensibilityExpression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitExtensibilityExpression(PROV_NParser.ExtensibilityExpressionContext ctx);
	/**
	 * Visit a parse tree produced by {@link PROV_NParser#extensibilityArgument}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitExtensibilityArgument(PROV_NParser.ExtensibilityArgumentContext ctx);
	/**
	 * Visit a parse tree produced by {@link PROV_NParser#extensibilityTuple}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitExtensibilityTuple(PROV_NParser.ExtensibilityTupleContext ctx);
}