import { Transform } from "jscodeshift";
import { TSTypeKind } from "ast-types/gen/kinds";

const genericName = "Freeze";

const transform: Transform = (file, api) => {
  const j = api.jscodeshift;

  return j(file.source)
    .find(j.TSTypeAnnotation)
    .filter((path) => {
      try {
        const isTypedParameter = path.parentPath.parentPath.name === "params";

        return isTypedParameter;
      } catch {
        return false;
      }
    })
    .replaceWith((node) => {
      return j.tsTypeAnnotation(
        j.tsTypeReference.from({
          typeName: j.identifier(genericName),
          typeParameters: j.tsTypeParameterInstantiation.from({
            params: [node.value.typeAnnotation as TSTypeKind],
          }),
        })
      );
    })
    .toSource();
};

export default transform;
