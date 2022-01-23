import React from 'react'
import { Link } from 'react-router-dom'

export const Decks = () => (
  <header>
    <h1>Your Decks</h1>
    <Link to='/decks/commander'>Commander</Link>
    <Link to='/decks/standard'>Standard</Link>
    <Link to='/decks/modern'>Modern</Link>
  </header>
)

export const Commander = () => (
  <div>
    <h4>Commander Decks</h4>
    <ul>
      <li>Nejeela, the Blade-Blossom (CEDH)</li>
      <li>The Gitrog Monster</li>
      <li>Feather, the Redeemed</li>
    </ul>
  </div>
)

export const Standard = () => (
  <div>
    <h4>Standard Decks</h4>
    <ul>
      <li>Lands Matter</li>
      <li>Spell Slinger</li>
      <li>Simic Mill</li>
    </ul>
  </div>
)

export const Modern = () => (
  <div>
    <h4>Modern Decks</h4>
    <ul>
      <li>WUBRG Aggro</li>
      <li>Fast Combo</li>
      <li>Casual</li>
    </ul>
  </div>
)
