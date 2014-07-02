<?php get_header(); ?>

			<div id="content">

				<div id="inner-content" class="wrap cf">

					<div id="main" class="m-all t-2of3 d-5of7 cf" role="main">

						<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

							<article id="post-<?php the_ID(); ?>" <?php post_class('cf'); ?> role="article" itemscope itemtype="http://schema.org/BlogPosting">

			                <header class="article-header">

			                  <h2 class="byline vcard">
			                    <time class="updated" datetime="<?php echo get_the_time('Y-m-j'); ?>" pubdate>
			                    	<span><?php echo get_the_time('l,'); ?></span>
			                    	<?php echo get_the_time('F jS, Y'); ?>
			                    </time>
			                  </h2>

			                  <h1 class="entry-title single-title" itemprop="headline"><?php the_title(); ?></h1>			                  
			                </header> <?php // end article header ?>

			                <section class="entry-content cf" itemprop="articleBody">
			                  <?php the_content(); ?>
			                </section> <?php // end article section ?>

			              	<footer>
				              	<?php next_post_link('%link', '<span>Next post</span> %title'); ?>
								<?php previous_post_link('%link', '<span>Previous post</span> %title'); ?>
							</footer>

			              </article> <?php // end article ?>

			              <?php comments_template(); ?>

						<?php endwhile; ?>

						<?php else : ?>

							<article id="post-not-found" class="hentry cf">
									<header class="article-header">
										<h1><?php _e( 'Oops, Post Not Found!', 'bonestheme' ); ?></h1>
									</header>
									<section class="entry-content">
										<p><?php _e( 'Uh Oh. Something is missing. Try double checking things.', 'bonestheme' ); ?></p>
									</section>
									<footer class="article-footer">
											<p><?php _e( 'This is the error message in the single.php template.', 'bonestheme' ); ?></p>
									</footer>
							</article>

						<?php endif; ?>

					</div>

					<?php get_sidebar(); ?>

				</div>

			</div>

<?php get_footer(); ?>
