import { Transform, TSTypeOperator } from "jscodeshift";

const transform: Transform = (file, api) => {
  const j = api.jscodeshift;

  return j(file.source)
    .find(j.TSTypeAnnotation)
    .filter((path) => {
      try {
        return path.parentPath.parentPath.name === "params";
      } catch {
        return false;
      }
    })
    .replaceWith((node) => {
      return j.tsTypeAnnotation(
        j.tsTypeReference.from({
          typeName: j.identifier("Freeze"),
          typeParameters: j.tsTypeParameterInstantiation.from({
            params: [node.value.typeAnnotation as TSTypeOperator],
          }),
        })
      );
    })
    .toSource();
};

export default transform;
