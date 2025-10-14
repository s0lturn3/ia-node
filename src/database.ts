// Lista de produtos
export const products: { nome: string, estoque: number }[] = [
  { nome: 'Clean Code', estoque: 12 },
  { nome: 'The Pragmatic Programmer', estoque: 8 },
  { nome: 'Design Patterns: Elements of Reusable Object-Oriented Software', estoque: 5 },
  { nome: 'Refactoring: Improving the Design of Existing Code', estoque: 10 },
  { nome: 'You Don\'t Know JS', estoque: 15 },
  { nome: 'JavaScript: The Good Parts', estoque: 7 },
  { nome: 'Eloquent JavaScript', estoque: 9 },
  { nome: 'Head First Design Patterns', estoque: 6 },
  { nome: 'Introduction to Algorithms', estoque: 4 },
  { nome: 'Structure and Interpretation of Computer Programs', estoque: 3 },
  { nome: 'Code Complete', estoque: 11 },
  { nome: 'Effective Java', estoque: 13 },
  { nome: 'Python Crash Course', estoque: 14 },
  { nome: 'Fluent Python', estoque: 6 },
  { nome: 'Programming Pearls', estoque: 2 },
  { nome: 'Working Effectively with Legacy Code', estoque: 5 },
  { nome: 'Test-Driven Development by Example', estoque: 7 },
  { nome: 'Continuous Delivery', estoque: 8 },
  { nome: 'Domain-Driven Design', estoque: 4 },
  { nome: 'Patterns of Enterprise Application Architecture', estoque: 3 },
  { nome: 'The Art of Computer Programming', estoque: 1 },
  { nome: 'Cracking the Coding Interview', estoque: 9 },
  { nome: 'Grokking Algorithms', estoque: 10 },
  { nome: 'Soft Skills: The software developer\'s life manual', estoque: 12 },
  { nome: 'The Mythical Man-Month', estoque: 2 }
];


// Lista de métodos
export const getProdutosEmEstoque = () => {
  return products.filter(e => e.estoque > 0);
}

export const getProdutosEmFalta = () => {
  return products.filter(e => e.estoque === 0);
}
