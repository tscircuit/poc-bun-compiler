import _health from "./api/health"
import _soup_compiler_compile_to_soup from "./api/soup_compiler/compile_to_soup"
import _soup_compiler_get_available_exports from "./api/soup_compiler/get_available_exports"

export default {
  "health": _health,
  "soup_compiler/compile_to_soup": _soup_compiler_compile_to_soup,
  "soup_compiler/get_available_exports": _soup_compiler_get_available_exports
}